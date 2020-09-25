// move this later

async function post(data) {
  try {
      // Create request to api service
      const req = await fetch('http://127.0.0.1/api', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          
          // format the data
          body: JSON.stringify({
              id: data.id,
              foo: data.foo,
              bar: data.bar
          }),
      });
      
      const res = await req.json();

      // Log success message
      console.log(res);                
  } catch(err) {
      console.error(`ERROR: ${err}`);
  }
}

module.exports.post = post