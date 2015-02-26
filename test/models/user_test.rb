require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'presence of first_name' do
  	@u = User.new
  	@u.first_name = "Bob"
  	@u.last_name = "Marley"
  	@u.email = "bobmarley@gmail.com"
  	@u.password = "bobmarley"

  	[@u.first_name, @u.last_name, @u.email, @u.password].each do |param|
  		assert_not_nil param
  		assert_not_equal param, ""
  		assert_not_equal param, " "
  	end

  	[@u.first_name, @u.last_name].each do |param|
  		# Test name format here.
  	end

  	# Email format assertion and uniqueness assertion here.

  	# Password length assertion here.


  end


	# validates :first_name, presence: true, format: /\A[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+\z/u
	# validates :last_name, presence: true, format: /\A[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+\z/u
	# validates :email, presence: true, uniqueness: true, format: /\A[-a-z0-9~!\z%^&*_=+}{\'?]+(\.[-a-z0-9~!\z%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?\z/i
	# validates :password, presence: true, length: { in: 6..20 }


end
