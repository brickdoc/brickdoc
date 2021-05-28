# frozen_string_literal: true

module BrickGraphQL
  class BaseResolver < ::GraphQL::Schema::Resolver
    argument_class BaseArgument
    include Plugins::EntrypointValidatable
    # override graphql-ruby
    # When the `resolve` method does not exist, the `field` is returned directly
    def resolve(**_args)
      @field
    end
  end
end
