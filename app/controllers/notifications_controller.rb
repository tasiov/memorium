class NotificationsController < ApplicationController
  def new
    @notification = Notification.new(notif_params)
    @notification.save
    @user = @current_user
  end

  private
  def notif_params
    params.require(:notification).permit(:sender_id, :recipient_id, :message_type)
  end
end
