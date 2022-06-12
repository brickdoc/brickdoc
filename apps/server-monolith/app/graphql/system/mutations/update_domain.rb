# frozen_string_literal: true

module System
  module Mutations
    class UpdateDomain < BrickGraphQL::BaseMutation
      argument :domain, String, 'current domain', required: true
      argument :new_domain, String, 'new domain', required: true

      def resolve(domain:, new_domain:)
        # TODO: permission check
        pod = current_user.pods.find { |p| p.domain == domain }
        return { errors: [I18n.t('accounts.errors.pod_not_exist')] } if pod.nil?

        pod.domain = new_domain
        success = pod.save
        return { errors: pod.errors.full_messages } unless success

        {}
      end
    end
  end
end
