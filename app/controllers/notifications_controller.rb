class NotificationsController < ApplicationController
  def new
    @user = @current_user

    @notification = Notification.new(notif_params)
    @notification.message = generate_message
    @notification.save
  end

  private
  def generate_message
    memorial_title = @notification.memorial.title
    sender = @notification.sender.first_name
    privilege = @notification.message_type

    "#{sender} invited you to be a #{privilege} at #{memorial_title}"
  end

  def notif_params
    params.require(:notification).permit(:sender_id, :recipient_id, :memorial_id, :message_type)
  end
end
