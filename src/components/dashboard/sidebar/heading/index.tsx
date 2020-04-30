import './dashboard-heading.styl'

const Heading = () => {
  let userImage =
      'https://i1.sndcdn.com/avatars-000307598863-zfe44f-t500x500.jpg',
    userName = 'Umarun'

  return (
    <header id="dashboard-header">
      <figure className="cover">
        <img className="image" src={userImage} />
      </figure>
      <h3 className="username">{userName}</h3>
    </header>
  )
}

export default Heading
