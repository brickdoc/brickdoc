# frozen_string_literal: true

module System
  module Queries
    class Pod < BrickGraphQL::BaseResolver
      description 'return current pod for user.'

      argument :domain, GraphQL::Types::String, required: true
      type System::Objects::Pod, null: false
      authenticate_user!

      def resolve(domain:)
        pod = current_user.pods.find_by(domain: domain)
        is_owner = pod.owner_id == current_user.id
        pod.as_json.merge({
          owned: is_owner,
          invite_secret: is_owner ? pod.invite_secret : nil,
        })
      end
    end
  end
end