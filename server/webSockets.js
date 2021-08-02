

module.exports = {

  gameWebSocket: (ws, { params }) => {
    // TODO: send updated latitude and longitude after each nudge
    const id = setInterval(() => {
      ws.send(JSON.stringify({ id: params.gameId, latitude: '123', longitude: '456' }))
    }, 100)

    ws.on('close', () => clearInterval(id))
  }
}
