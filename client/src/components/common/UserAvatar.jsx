const UserAvatar = ({ image }) => {
  return (
    <div>
      {image ? (
        <img
          src={image}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <img
          src="img/avatar.png"
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default UserAvatar;
