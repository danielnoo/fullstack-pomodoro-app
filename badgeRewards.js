const earnedBadgeData = [
  {name: "coffee"}, 
  {name: "cupcake"}, 
  {name: "burger"}
];

async function post(data) {
  try {
      // Create request to api service
      const req = await fetch('/dashboard', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          
          // format the data
          body: JSON.stringify({
              name: data.name,
              
          }),
      });
      
      const res = await req.json();

      // Log success message
      console.log(res);                
  } catch(err) {
      console.error(`ERROR: ${err}`);
  }
};

module.exports.earnedBadgeData = earnedBadgeData;
module.exports.post = post;