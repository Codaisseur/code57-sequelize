const express = require("express")
const userRouter = require("./routers/users")

//Start an express server
//Write 4 endpoints: Create(post), Read(get), Update(put), Delete(delete)

const app = express()
const PORT = 4000

//middlewares
app.use(express.json()) //parse the body

const myMiddleware = (request, response, next) => {
  console.log("middleware was triggered")
  next()
}

const randomMiddleware = (request, response, next) => {
  const randomNumber = Math.random() * 10
  console.log(randomNumber)

  if (randomNumber <= 5){
    console.log("welcome to my middleware")
    next()
  } else {
    response.status(401).end()
  }

}

//welcome route
app.get("/", randomMiddleware, (request, response, next) => {
  try {
    response.send("Welcome to my API")
  } catch (e) {
    console.log(e.message)
    next(e)
  }
})

app.use("/users", myMiddleware, userRouter)


app.listen(PORT, () => console.log(`Listening on ${PORT}`))