class SocketService {
  constructor() {
    this.io = null;
  }

  initialize(io) {
    this.io = io;
  }

  emitNewTransaction(transaction) {
    if (this.io) {
      this.io.to("admin").emit("new-transaction", transaction);
      this.io.to("analyst").emit("new-transaction", transaction);
      this.io.to("viewer").emit("new-transaction", transaction);
    }
  }

  emitHighRiskAlert(transaction) {
    if (this.io) {
      this.io.to("admin").emit("high-risk-alert", transaction);
      this.io.to("analyst").emit("high-risk-alert", transaction);
    }
  }
}

export default new SocketService();
