class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ChatUser"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
