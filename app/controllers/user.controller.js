
const validateUser = async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new ErrorHandler(404, 'Missing required email and password fields')
      }
      const user = await  db.User.findOne({ where: { email }});
      if (!user) {
        throw new ErrorHandler(404, 'User with the specified email does not exists')
      }
      next()
    } catch (error) {
      next(error)
    }
  }