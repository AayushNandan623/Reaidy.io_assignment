export function setupSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join-role", (role) => {
      if (["admin", "analyst", "viewer"].includes(role)) {
        socket.join(role);
        console.log(`User joined role: ${role}`);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
