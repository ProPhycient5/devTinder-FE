export const UserCard = ({user}) => {
    const {firstName, lastName, bio, photoUrl, age, gender} = user
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10 ">
        <img
          src={photoUrl}
          alt="Photo"
          className="rounded-xl h-56"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName} {lastName}, {age}, {gender}</h2>
        <p>
          {bio}
        </p>
        <div className="card-actions">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};
