class Message < ApplicationRecord
    after_create_commit { broadcast_message }
belongs_to :user
    private
    def broadcast_message
        ActionCable.server.broadcast("ChatUser",{
            id: id,
            body: body,
            user_id: user.id
        }) 
    end
end
