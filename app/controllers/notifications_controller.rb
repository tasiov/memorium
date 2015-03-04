class NotificationsController < ApplicationController
  def new
    @notification = Notification.new(notif_params)
    @user = User.find(@notification.recipient_id)

    @user_memorial = MemorialUser.new(user_id: @user.id, memorial_id: @notification.memorial_id,
                                          role: @notification.message_type)
    @user_memorial.save

    @notification.message = generate_message
    @notification.status = "unread"
    @notification.save
  end

  def change_status
    @notification = Notification.find(params[:format])
    @notification.status = "read"
    @notification.save
    redirect_to user_memorial_path(@current_user.id, @notification.memorial_id)
  end

  private
  def generate_message
    memorial_title = @notification.memorial.title
    sender = @notification.sender.first_name
    privilege = @notification.message_type

    "#{sender} invited you to be a #{privilege} at #{memorial_title}"

  end

  def notif_params
    params.require(:notification).permit(:sender_id, :recipient_id, :memorial_id, :message_type, :id)
  end
end
