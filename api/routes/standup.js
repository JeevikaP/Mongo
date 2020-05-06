const Standup = require('../../models/standup')

module.exports=function(router){
    //GET: the 12 newest standup meeting notes
    router.get('/standup',function(req,res){
        //res.send("hello");

        Standup.find({},(err,standup)=>{t
            //check if error was found or no
            if(err){
                res.json({success:false,message:err}); //return error message
            }else{
                //check if standup were found in databse
                if(!standup){
                    res.json({success:false,message:'No standup found.'});
                }else{
                    res.json({success:true,standup:standup}); //return success msg
                }
            }
        })
    })


router.post('/standup',function(req,res){
    let note=new Standup(req.body)
    note.save(function(err,note){
        if(err){
            return res.status(400).json(err)
        }
        res.status(200).json(note)
    })
})

router.put('/updateStandup',(req,res)=>{
    //check if id was provided
    if(!req.body._id){
        res.json({success:false,message:'No standup id provided'});
    }else{
        Standup.findOne({_id:req.body._id},(err,standup)=>{
            //check if id 
            if(err){
                res.json({success:false,message:'Not a valid standup id'}); //return error message
            }else{
                
                standup.teamMember=req.body.teamMember;
                standup.project=req.body.project;
                standup.workYesterday=req.body.workYesterday;
                standup.workToday=req.body.workToday;
                standup.impediment=req.body.impediment;
                standup.createdOn=req.body.createdOn;
                standup.save((err)=>{
                    if(err){
                        res.json({success:false,message:err});
                    }else{
                        res.json({success:true,message:'standup Updated!'});
                    }
                });
            }
       });
   }
});


router.delete('/deleteStandup/:id',(req,res)=>{
    if(!req.params.id){
        res.json({success:false,message:'No id provided'});
    }else{
        Standup.findOne({_id:req.params.id},(err,standup)=>{
            if(err){
                res.json({success:false,message:'Invalid id'}); //return error message
                }else{
                    standup.remove((err)=>{
                        if(err){
                           res.json({success:false,message:err}); //return error message

                        } else{
                          res.json({success:true,message:'Standup deleted!'}); //return error message

                        }
                    });
                }
        });
    }
});
}


