export type MessageHeader = {
    category: string,
    difficulty: string
}

export type ConsumerMessageHeaderReq = MessageHeader & {
    "x-match": "all";
}

export type CancelMessageHeader = {
    matchId: string,
}
