






export async function posty(data) {
   
  
  try {
      // Create request to api service
      const req = await fetch('/dashboard', {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          
          // format the data
          body: JSON.stringify({
            name: data.name,
            focus: data.focus          
          }),
      });
      
      const res = await req.json();

      // Log success message
      console.log(res);                
  } catch(err) {
      console.log(err);
  }
}

