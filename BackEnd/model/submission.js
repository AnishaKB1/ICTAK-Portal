const mongoose=require ('mongoose');
const submission=mongoose.Schema({
  // submissionId: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'projectdata', required: true },
  mentorId: { type: Schema.Types.ObjectId, ref: 'mentordata', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'studentdata', required: true },
  status: { type: String, required: true },
  marks: { type: Number, required: true },
  comments: { type: String },
  submissionUrl: { type: String },
  Date: { type: Date, default: Date.now },
})
const subdata=mongoose.model('submissiondata',submission);
module.exports=subdatadata;