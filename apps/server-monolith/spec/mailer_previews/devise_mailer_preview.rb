# frozen_string_literal: true

class DeviseMailerPreview < ActionMailer::Preview
  def confirmation_instructions
    Devise::Mailer.confirmation_instructions(Accounts::User.first, {})
  end

  def unlock_instructions
    Devise::Mailer.unlock_instructions(Accounts::User.first, 'faketoken')
  end

  def reset_password_instructions
    Devise::Mailer.reset_password_instructions(Accounts::User.first, 'faketoken')
  end
end
