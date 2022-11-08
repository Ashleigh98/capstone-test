
import axios from 'axios';

const base_url = 'https://localhost:8000/displayAll' 

test('api test', () => {
   axios.get(`${base_url}`)
  .then((result) => {
    expect(result.status).toBe(200)
  })  
});
