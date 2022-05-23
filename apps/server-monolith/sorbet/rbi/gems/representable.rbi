# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: true
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/representable/all/representable.rbi
#
# representable-3.2.0

module Representable
end
class Representable::Option < Trailblazer::Option
end
class Representable::Config < Declarative::Definitions
end
class Representable::Definition < Declarative::Definitions::Definition
end
module Representable::Declarative
  include Declarative::Heritage::DSL
  include Declarative::Schema::DSL
  include Declarative::Schema::Feature
end
module Representable::Function
end
class Representable::Function::Prepare
end
class Representable::Function::Decorate
end
module Representable::CreateObject
end
module Representable::Binding::Factories
end
class Representable::Binding
  extend Uber::Delegates
  include Anonymous_Module_70
  include Representable::Binding::Deprecatable
  include Representable::Binding::EvaluateOption
  include Representable::Binding::Factories
end
class Representable::Binding::Map < Array
end
class Representable::Binding::FragmentNotFound
end
module Anonymous_Module_70
  extend Forwardable
end
module Representable::Binding::Deprecatable
end
module Representable::Binding::EvaluateOption
end
module Representable::Binding::Collection
end
class Representable::DeserializeError < RuntimeError
end
class Representable::Pipeline < Array
  extend Representable::Pipeline::Macros
end
class Representable::Pipeline::Stop
end
module Representable::Pipeline::Macros
end
class Representable::Collect < Representable::Pipeline
end
class Representable::Collect::Hash < Representable::Pipeline
end
module Representable::Pipeline::Function
end
class Representable::Pipeline::Function::Insert
end
module Representable::Cached
end
module Representable::Cached::BuildDefinition
end
module Representable::ForCollection
end
module Representable::Represent
end
module Representable::ModuleExtensions
end
module Representable::ClassMethods
end
module Representable::Hash
end
class Representable::Hash::Binding < Representable::Binding
end
class Representable::Hash::Binding::Collection < Representable::Hash::Binding
  include Representable::Binding::Collection
end
module Representable::Hash::ClassMethods
end
module Representable::JSON
  extend Representable::ClassMethods
  extend Representable::Declarative
  extend Representable::ForCollection
  extend Representable::Hash::ClassMethods
  extend Representable::Hash::ClassMethods
  extend Representable::ModuleExtensions
  extend Representable::Represent
  include Representable
  include Representable::Hash
end
module Representable::JSON::ClassMethods
end
module Representable::HashMethods
end
module Representable::JSON::Hash
end
module Representable::JSON::Hash::ClassMethods
end
class Representable::Decorator
  extend Representable::Cached::BuildDefinition
  extend Representable::ClassMethods
  extend Representable::Declarative
  extend Representable::ForCollection
  extend Representable::ModuleExtensions
  extend Representable::Represent
  extend Uber::InheritableAttr
  include Representable
  include Representable::Cached
end
class Representable::Populator
end