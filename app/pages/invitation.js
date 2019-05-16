import Button from '@material-ui/core/Button';

export default function Index() {
  const random = Math.floor(Math.random()*10000)
  return (
    <div>
      <h1>Hello Next.js 👋</h1>
      <a href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1574531203&redirect_uri=http://localhost:3000/invitation&state=${random}&bot_prompt=aggressive&scope=openid profile`}>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </a>
    </div>
  )
}