const express = require('express');
const z = require('zod');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cookieParser());

// app.use(cors("*",
//   {
//     origin: true,
//     credentials: true
//   }
// ));
// app.use(cors());
app.use(
  cors({origin: ["http://localhost:5173", "https://react-and-backend.vercel.app"]})
);
// app.use(
//   cors({origin: "https://react-and-backend-git-main-ramik10.vercel.app", credentials: true})
// );
app.use(express.json());

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});
const courseSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  published: Boolean,
  imageLink: String,
  content: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseDetails'}]
});

const courseDetailsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    videoLink: String
});

const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
const CourseDetails = mongoose.model('CourseDetails', courseDetailsSchema);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const secretKey = process.env.SECRET_KEY; // replace this with your own secret key

const generateJwt = (user) => {
  const payload = { username: user.username, };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const authenticateJwt = (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  }
  else {
    res.sendStatus(401);
  }
}

app.post('/admin/signup', async (req, res) => {
  const admin = req.body;
  const existingAdmin = await Admin.findOne(admin);
  if (existingAdmin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    const newadmin =  new Admin({"username":admin.username, "password":admin.password});
    await newadmin.save();
    const token = generateJwt(newadmin);
    res.json({ message: 'Admin created successfully', "authorization":token });
  }
});

app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({username, password});

  if (admin) {
    const token = generateJwt(admin);
    res.json({ message: 'Logged in successfully', "authorization": token });
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
});

app.post('/admin/courses', authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  // console.log(course);
  res.json({ message: 'Course created successfully', courseId: course._id });
});

app.post('/admin/courses/:courseId/content', authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  const courseDetails = new CourseDetails(req.body);
  await courseDetails.save();
  course.content.push(courseDetails._id);
  await course.save();
  res.json({ message: 'Course content created successfully' });
});

app.put('/admin/courses/:courseId', authenticateJwt, async(req, res) => {
  const courseId = parseInt(req.params.courseId);

  const course = Course.findByIdAndUpdate(courseId, req.body);

  if (course) {
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', authenticateJwt, async(req, res) => {
  res.json({ courses: await Course.find({}) });
});

const userDetails = z.object({
  username: z.string().min(1).max(20),
  password: z.string().min(1).max(10),
});

app.post('/users/signup', async(req, res) => {
  const user = userDetails.safeParse(req.body);
  if(!user.success) {
    res.status(400).json({ message: 'Invalid user details' });
  }
  else{
  const existingUser = await User.findOne(user.data);
  // console.log(user);
  if (existingUser) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({"username":user.data.username, "password":user.data.password});
    await newUser.save();
    const token = generateJwt(user.data);
    res.json({ message: 'User created successfully', "authorization": token});
  }}
});
app.post('/users/login', async(req, res) => {
  const user = userDetails.safeParse(req.body);
  if(!user.success) {
    res.status(400).json({ message: 'Invalid user details' });
  }
  else{
  const existingUser = await User.findOne(user.data);
  if (existingUser) {
    const token = generateJwt(user.data);
    res.json({ message: 'Logged in successfully', "authorization": token })
  } else {
    res.status(403).json({ message: 'User authentication failed' });
  }}
});
app.get('/users/me',authenticateJwt, (req, res) => {
  const user = req.user.username;
  if (user) {
    res.json({ message: 'User found', "username": user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



app.get('/users/courses', authenticateJwt, async(req, res) => {
  res.json(await Course.find({published: true}));
});

app.get('/users/courses/:courseId', authenticateJwt, async(req, res) => {
  // console.log(courseId);
  const course = await Course.findById(req.params.courseId);
  // console.log(course);
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.post('/users/courses/:courseId', authenticateJwt, async(req, res) => {
  const courseId = req.params.courseId;
  // console.log(courseId);
    const user = await User.findOne({username: req.user.username});
    if (user) {
      if(user.purchasedCourses.includes(courseId)){
        res.json({ message: 'Course already purchased' });
      }
      else{
      user.purchasedCourses.push(courseId);
      await user.save();
      res.json({ message: 'Course purchased successfully'});}
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  }
);

app.get('/users/purchasedCourses', authenticateJwt, async(req, res) => {
  const user = await User.findOne({username:req.user.username}).populate('purchasedCourses');
  if (user && user.purchasedCourses) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});
app.get('/users/purchasedCourses/:courseId', authenticateJwt, async(req, res) => {
  const user = await User.findOne({username:req.user.username}).populate('purchasedCourses');
  if (user && user.purchasedCourses) {
    const course = user.purchasedCourses.find(c=>c._id==req.params.courseId)
    if(course){
      const courseContent = await Course.findById(req.params.courseId).populate('content');
    
    if(courseContent){
      res.json({course:courseContent});
    }
    else{
      res.status(401).json({ message: 'Course not found' });
    }
  }
  else{
    res.status(402).json({ message: 'Course not purchased' });
  }
  }
  else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});
app.get('/users/purchasedCourses/:courseId/:contentId', authenticateJwt, async(req, res) => {
  const user = await User.findOne({username:req.user.username}).populate('purchasedCourses');
  if (user && user.purchasedCourses) {
    const course = user.purchasedCourses.find(c=>c._id==req.params.courseId)
    if(course){
      const courseContent = await Course.findById(req.params.courseId).populate('content');
    
    if(courseContent){
      const content = courseContent.content.find(c=>c._id==req.params.contentId);
      if(content){
        res.json({content});
      }
      else{
        res.status(404).json({ message: 'Content not found' });
      }
    }
    else{
      res.status(404).json({ message: 'Course not found' });
    }
  }
  else{
    res.status(404).json({ message: 'Course not purchased' });
  }
  }
  else {
    res.status(404).json({ message: 'No courses purchased' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
