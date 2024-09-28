export enum status{
  
    PROCESS = "processing",
    PENDING = "pending",
    PLACED  = "placed",
    DEALERCONFIRMATION = "dealer accepted",
    PREPARE = "preparing",
    PICKUP = "picked up",
    AGENTCONFIRMATION = "agent accepted",
    DELIVERED = "delivered",
    CANCELLED = "cancelled",
}

export enum cancel{
    USER="1",
    Dealer="2"
}