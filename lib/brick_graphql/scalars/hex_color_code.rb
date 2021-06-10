# frozen_string_literal: true

module BrickGraphQL
  class Scalars::HexColorCode < BrickGraphQL::BaseScalar
    description "Hex Color Code"
    REGEXP = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i

    def self.coerce_input(input_value, _context)
      raise GraphQL::CoercionError,
            "#{input_value.inspect} is not a valid Hex Color Code" unless input_value =~ REGEXP
    end

    def self.coerce_result(ruby_value, _context)
      # It's transported as a string, so stringify it
      ruby_value.to_s
    end
  end
end
