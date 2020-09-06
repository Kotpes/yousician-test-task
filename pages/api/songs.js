// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function songs(req, res) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      console.log('query', query);
      const response = await fetch('http://localhost:3000/api/songs');
      const data = await response.json();
      res.status(200).json(data);
      break;
  }
}
