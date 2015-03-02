class NotificationsController < ApplicationController
  def new
    @notification = Notification.new(notif_params)
    @notification.save
  end

  private
  def notif_params
    params.require(:notification).permit(:message, :created_at, :user_id, :memorial_id)
  end
end
