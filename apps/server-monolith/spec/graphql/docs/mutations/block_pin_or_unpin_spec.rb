# typed: false
# frozen_string_literal: true

require 'rails_helper'

describe Docs::Mutations::BlockPinOrUnpin, type: :mutation do
  describe '#resolve' do
    mutation = <<-'GRAPHQL'
      mutation blockPinOrUnpin($input: BlockPinOrUnpinInput!) {
        blockPinOrUnpin(input: $input) {
          errors
        }
      }
    GRAPHQL

    let(:user) { create(:accounts_user) }

    it 'work' do
      self.current_user = user
      self.current_space = user.personal_space.as_session_context

      block = create(:docs_block, space: user.personal_space)

      input = { input: { blockId: block.id, pin: true } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockPinOrUnpin' => nil })

      pin = Docs::Pin.find_by!(user_id: user.id, space_id: block.space_id, block_id: block.id)
      expect(pin.deleted_at).to be_nil

      input = { input: { blockId: block.id, pin: false } }
      internal_graphql_execute(mutation, input)
      expect(response.errors).to eq({})
      expect(response.data).to eq({ 'blockPinOrUnpin' => nil })

      pin.reload
      expect(pin.deleted_at).not_to be_nil

      self.current_user = nil
      self.current_space = nil
    end
  end
end