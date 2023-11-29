const mongoose=require ('mongoose');
const submission=mongoose.Schema({

  projectId: { type: Schema.Types.ObjectId, ref: 'projectdata', required: true },
  mentorId: { type: Schema.Types.ObjectId, ref: 'mentordata', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'studentdata', required: true },
  submissionUrl:{ type: String, required: true },
  status: { type: String },
  marks: { type: Number},
  comments: { type: String },
  referenceMaterial: { type: String }
})
const subdata=mongoose.model('submissiondata',submission);
module.exports=subdatadata;