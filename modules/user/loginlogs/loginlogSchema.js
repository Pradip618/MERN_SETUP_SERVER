const mongooose = require('mongoose');
const schema = mongooose.Schema;

const loginLogSchema = new schema({
    login_date: { type: Date, required: true, default: Date.now },
    logout_date: { type: Date },
    is_active: { type: Boolean, required: true, default: true },
    token:{type:String, required:true},
    user_id: {type:schema.Types.ObjectId, required:true, ref:'users'}
});

module.exports = mongooose.model('loginLog',loginLogSchema);