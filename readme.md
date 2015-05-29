// User ID Initialize
// Get
{
	userId: String // Random Unique ID
}

// Rooms
// Post
{
	name: String // Username
}

// Rooms
// Get
[{
	name: String
	id: String
}]

// Send Message
// Post
{
	userId: String,
	message: String
}

// Get Messages
// Get
[{
	userId: String,
	message: String
}]

