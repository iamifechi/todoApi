const fs = require('fs')
const path = __dirname.replace('controllers','')
const Flights = require('../models/Flight').flights;
const dummyData = require('../dummydata');


// 1. Add/Book Flight
// 2. Get all Flight
// 3. Get a single Flight
// 4. Update/Edit Flight
// 5. Delete Flight
const createDB = (data)=>{
  fs.writeFileSync(path + '\\DB.json', JSON.stringify(data));
  
  let DB = readFile(path + '\\DB.json', (err, data)=>{
    if(err){
      console.log(err)
      return;
    }else{
      console.log('DATA: ',data)
    }
  })
  return DB
}

 const readFile=(path, callback)=>{
  fs.readFile(path, (err, data)=>{
    if(err){
      return callback && callback(err)
    }
    try{
      const DB = JSON.parse(data)
      return callback && callback(null, DB)
    }catch(err){
      return callback && callback(err)
    }
  })
 }

 const saveToDB = (data) =>{
   fs.writeFile(path + '\\DB.json', data, err =>{
    if(err){
      console.log('could not save file')
     return false && err
    }else return true
  })
 }

// @desc      Add/Book Flight
// @route     POST /api/v1/flights/
// @access    Public
exports.bookFlight = (req, res) => {
    const {title,time,price,date} = req.body
    const data = {title,time,price,date};
    const dateObj = new Date();
    const id = `flight-${dateObj.getTime()}`

    if(!title){
      res.status(406).json({
        success: false,
        message: 'Please add title',
      });
    }if(!time){
      res.status(406).json({
        success: false,
        message: 'Please add time',
      });
    }if(!price){
      res.status(406).json({
        success: false,
        message: 'Please add price',
      });
    }if(!date){
      res.status(406).json({
        success: false,
        message: 'Please add date',
      });
    }

    const flight = {id, ...data}

    const FLIGHTS = readFile(path + '\\DB.json', (err, data)=>{
      if(!data){
        let db = createDB({});
        console.log(db)
        return db;
      }else{
        console.log('err: ',err)
      }
    })

    
    if (flight) {
      FLIGHTS.push(flight)
      const newFlightDb = saveToDB(JSON.stringify(...FLIGHTS))
      if(newFlightDb){
        res.status(201).json({
          success: true,
          message: 'Flight booked successfully',
          data: flight,
        });
      }
    }
    else {
      res.status(400).json({
        success: false,
        message: 'Could not book flight'
      });
    }
}

// @desc      Get all Flights
// @route     GET /api/v1/flights
// @access    Public
exports.getAllFlights = (req, res) => {
    res.status(200)
    .json({
        success: true,
        message: 'All flights retrieved',
        data: Flights
    });
  
};

// @desc      Get single flight
// @route     GET /api/v1/flights/:id
// @access    Public
exports.getSingleFlight = (req, res) => {
  const id = req.params.id;

  const flight = Flights.filter((flight)=>flight.id == id)

  if (flight.length > 0) {
    res.status(201).json({
      success: true,
      message: 'Flight retrieved successfully',
      data: flight[0],
    });
  }else {
    res.status(404).json({
      success: true,
      message: 'Flight not found',
    });
  }
};

// @desc      Update a flight
// @route     PUT /api/v1/flights/:id
// @access    Public
exports.updateFlight = (req, res) => {  
  const fieldsToUpdate = {...req.body}
  const updatableFields = ['title','price','time','date']
  const updates = Object.keys(fieldsToUpdate).
  filter((field)=>updatableFields.indexOf(field)>=0);
  const id = req.params.id;
  const flight = Flights.filter((flight)=>flight.id === id)[0]

  if(updates.length<1){
    res.status(400).json({
      success: false,
      message: 'this field does not exist or cannot be edited'
    })
  }else if(flight && updates.length>0){
    for(let i=0;i<updates.length;i++){
      let update = updates[i]
      flight[update] = fieldsToUpdate[update]
    }

    res.status(200).json({
      success: true,
      message: 'Flight details updated successfully',
      data: {
        flight
      },
    });

  }else{ 
    res.status(400).json({
      success: false,
      message: 'could not update flight details',
    });
  }
};


// @desc      Delete a flight
// @route     DELETE /api/v1/flights/:id
// @access    Public
exports.deleteFlight = (req, res) => {
  const id = req.params.id;
  const flight = Flights.filter((flight)=>flight.id === id)[0]
  if(flight){
    Flights.map((flight,index)=>{
      if(flight.id === id){
        Flights.splice(index,1)
      }
    })
    res.status(200).json({
      success: true,
      message: 'Flight deleted successfully',
      data: {},
    });

  }else{
    res.status(400).json({
      success: false,
      message: 'operation failed',
    });
  }
};


// @desc      Seed flight model with dummy data
// @route     POST /api/v1/flights/seed
// @access    Public
exports.seed = (req, res) => {
  Flights.push(...dummyData)
  res.status(200)
  .json({
      success: true,
      message: 'seeded flights db',
      data: Flights
  });
}
