# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: true
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/flipper/all/flipper.rbi
#
# flipper-0.24.1

module Flipper
  def [](*args, **, &block); end
  def actor(*args, **, &block); end
  def actors(*args, **, &block); end
  def adapter(*args, **, &block); end
  def add(*args, **, &block); end
  def bool(*args, **, &block); end
  def boolean(*args, **, &block); end
  def configuration; end
  def configuration=(configuration); end
  def configure; end
  def disable(*args, **, &block); end
  def disable_actor(*args, **, &block); end
  def disable_group(*args, **, &block); end
  def disable_percentage_of_actors(*args, **, &block); end
  def disable_percentage_of_time(*args, **, &block); end
  def enable(*args, **, &block); end
  def enable_actor(*args, **, &block); end
  def enable_group(*args, **, &block); end
  def enable_percentage_of_actors(*args, **, &block); end
  def enable_percentage_of_time(*args, **, &block); end
  def enabled?(*args, **, &block); end
  def exist?(*args, **, &block); end
  def feature(*args, **, &block); end
  def features(*args, **, &block); end
  def group(name); end
  def group_exists?(name); end
  def group_names; end
  def groups; end
  def groups_registry; end
  def groups_registry=(registry); end
  def import(*args, **, &block); end
  def instance; end
  def instance=(flipper); end
  def memoize=(*args, **, &block); end
  def memoizing?(*args, **, &block); end
  def new(adapter, options = nil); end
  def percentage_of_actors(*args, **, &block); end
  def percentage_of_time(*args, **, &block); end
  def preload(*args, **, &block); end
  def preload_all(*args, **, &block); end
  def register(name, &block); end
  def remove(*args, **, &block); end
  def sync(*args, **, &block); end
  def sync_secret(*args, **, &block); end
  def time(*args, **, &block); end
  def unregister_groups; end
  extend Flipper
  extend Forwardable
end
class Flipper::Actor
  def ==(other); end
  def eql?(other); end
  def flipper_id; end
  def hash; end
  def initialize(flipper_id); end
end
class Flipper::Error < StandardError
end
class Flipper::GateNotFound < Flipper::Error
  def initialize(thing); end
end
class Flipper::DuplicateGroup < Flipper::Error
end
class Flipper::DefaultNotSet < Flipper::Error
  def initialize(message = nil); end
end
class Flipper::InvalidConfigurationValue < Flipper::Error
  def initialize(message = nil); end
end
class Flipper::ConfigurationDeprecated < Flipper::Error
  def initialize(message = nil); end
end
class Flipper::Type
  def ==(other); end
  def eql?(other); end
  def self.wrap(value_or_instance); end
  def value; end
end
module Flipper::Gates
end
class Flipper::Gates::Actor < Flipper::Gate
  def data_type; end
  def enabled?(value); end
  def key; end
  def name; end
  def open?(context); end
  def protects?(thing); end
  def wrap(thing); end
end
class Flipper::Gates::Boolean < Flipper::Gate
  def data_type; end
  def enabled?(value); end
  def key; end
  def name; end
  def open?(context); end
  def protects?(thing); end
  def wrap(thing); end
end
class Flipper::Gates::Group < Flipper::Gate
  def data_type; end
  def enabled?(value); end
  def key; end
  def name; end
  def open?(context); end
  def protects?(thing); end
  def wrap(thing); end
end
class Flipper::Gates::PercentageOfActors < Flipper::Gate
  def data_type; end
  def enabled?(value); end
  def key; end
  def name; end
  def open?(context); end
  def protects?(thing); end
end
class Flipper::Gates::PercentageOfTime < Flipper::Gate
  def data_type; end
  def enabled?(value); end
  def key; end
  def name; end
  def open?(context); end
  def protects?(thing); end
end
class Flipper::Gate
  def data_type; end
  def enabled?(_value); end
  def initialize(options = nil); end
  def inspect; end
  def key; end
  def name; end
  def open?(_thing, _value, _options = nil); end
  def protects?(_thing); end
  def wrap(thing); end
end
class Flipper::FeatureCheckContext
  def actors_value; end
  def boolean_value; end
  def feature_name; end
  def groups_value; end
  def initialize(options = nil); end
  def percentage_of_actors_value; end
  def percentage_of_time_value; end
  def thing; end
  def values; end
end
module Flipper::Typecast
  def self.to_boolean(value); end
  def self.to_float(value); end
  def self.to_integer(value); end
  def self.to_percentage(value); end
  def self.to_set(value); end
end
class Flipper::GateValues
  def ==(other); end
  def [](key); end
  def actors; end
  def boolean; end
  def eql?(other); end
  def groups; end
  def initialize(adapter_values); end
  def percentage_of_actors; end
  def percentage_of_time; end
end
class Flipper::Feature
  def actors_value; end
  def adapter; end
  def add; end
  def boolean_value; end
  def clear; end
  def conditional?; end
  def disable(thing = nil); end
  def disable_actor(actor); end
  def disable_group(group); end
  def disable_percentage_of_actors; end
  def disable_percentage_of_time; end
  def disabled_gate_names; end
  def disabled_gates; end
  def disabled_groups; end
  def enable(thing = nil); end
  def enable_actor(actor); end
  def enable_group(group); end
  def enable_percentage_of_actors(percentage); end
  def enable_percentage_of_time(percentage); end
  def enabled?(thing = nil); end
  def enabled_gate_names; end
  def enabled_gates; end
  def enabled_groups; end
  def exist?; end
  def gate(name); end
  def gate_for(thing); end
  def gate_values; end
  def gates; end
  def groups; end
  def groups_value; end
  def initialize(name, adapter, options = nil); end
  def inspect; end
  def instrument(operation); end
  def instrumenter; end
  def key; end
  def name; end
  def off?; end
  def on?; end
  def percentage_of_actors_value; end
  def percentage_of_time_value; end
  def remove; end
  def state; end
  def to_param; end
  def to_s; end
end
module Flipper::Adapters
end
class Flipper::Adapters::Sync
end
class Flipper::Adapters::Sync::FeatureSynchronizer
  def call; end
  def default_config; end
  def default_gate_values; end
  def default_gate_values?(gate_values); end
  def initialize(feature, local_gate_values, remote_gate_values); end
  def local_actors(*args, **, &block); end
  def local_boolean(*args, **, &block); end
  def local_boolean_enabled?; end
  def local_disabled?; end
  def local_groups(*args, **, &block); end
  def local_percentage_of_actors(*args, **, &block); end
  def local_percentage_of_time(*args, **, &block); end
  def remote_actors(*args, **, &block); end
  def remote_boolean(*args, **, &block); end
  def remote_boolean_enabled?; end
  def remote_disabled?; end
  def remote_groups(*args, **, &block); end
  def remote_percentage_of_actors(*args, **, &block); end
  def remote_percentage_of_time(*args, **, &block); end
  def sync_actors; end
  def sync_groups; end
  def sync_percentage_of_actors; end
  def sync_percentage_of_time; end
  extend Forwardable
end
class Flipper::Adapters::Sync::Synchronizer
  def call; end
  def initialize(local, remote, options = nil); end
  def sync; end
end
module Flipper::Adapter
  def default_config; end
  def get_all; end
  def get_multi(features); end
  def import(source_adapter); end
  def self.included(base); end
end
module Flipper::Adapter::ClassMethods
  def default_config; end
end
class Flipper::Adapters::Memoizable < SimpleDelegator
  def adapter; end
  def add(feature); end
  def cache; end
  def clear(feature); end
  def disable(feature, gate, thing); end
  def enable(feature, gate, thing); end
  def expire_feature(feature); end
  def expire_features_set; end
  def features; end
  def get(feature); end
  def get_all; end
  def get_multi(features); end
  def initialize(adapter, cache = nil); end
  def key_for(key); end
  def memoize=(value); end
  def memoizing?; end
  def name; end
  def remove(feature); end
  def self.key_for(key); end
  extend Flipper::Adapter::ClassMethods
  include Flipper::Adapter
end
class Flipper::Adapters::Memory
  def add(feature); end
  def clear(feature); end
  def disable(feature, gate, thing); end
  def enable(feature, gate, thing); end
  def features; end
  def get(feature); end
  def get_all; end
  def get_multi(features); end
  def initialize(source = nil); end
  def inspect; end
  def name; end
  def remove(feature); end
  extend Flipper::Adapter::ClassMethods
  include Flipper::Adapter
end
class Flipper::Adapters::Instrumented < SimpleDelegator
  def add(feature); end
  def clear(feature); end
  def disable(feature, gate, thing); end
  def enable(feature, gate, thing); end
  def features; end
  def get(feature); end
  def get_all; end
  def get_multi(features); end
  def initialize(adapter, options = nil); end
  def instrumenter; end
  def name; end
  def remove(feature); end
  extend Flipper::Adapter::ClassMethods
  include Flipper::Adapter
end
class Flipper::Configuration
  def adapter(&block); end
  def default(&block); end
  def initialize(options = nil); end
end
class Flipper::DSL
  def [](name); end
  def actor(thing); end
  def actors(number); end
  def adapter; end
  def add(name); end
  def bool(value = nil); end
  def boolean(value = nil); end
  def disable(name, *args); end
  def disable_actor(name, actor); end
  def disable_group(name, group); end
  def disable_percentage_of_actors(name); end
  def disable_percentage_of_time(name); end
  def enable(name, *args); end
  def enable_actor(name, actor); end
  def enable_group(name, group); end
  def enable_percentage_of_actors(name, percentage); end
  def enable_percentage_of_time(name, percentage); end
  def enabled?(name, *args); end
  def exist?(name); end
  def feature(name); end
  def features; end
  def group(name); end
  def import(flipper); end
  def initialize(adapter, options = nil); end
  def instrumenter; end
  def memoize=(*args, **, &block); end
  def memoizing?(*args, **, &block); end
  def percentage_of_actors(number); end
  def percentage_of_time(number); end
  def preload(names); end
  def preload_all; end
  def remove(name); end
  def sync; end
  def sync_secret; end
  def time(number); end
  extend Forwardable
end
module Flipper::Instrumenters
end
class Flipper::Instrumenters::Memory
  def event_by_name(name); end
  def events; end
  def events_by_name(name); end
  def initialize; end
  def instrument(name, payload = nil); end
  def reset; end
end
class Flipper::Instrumenters::Memory::Event < Struct
  def name; end
  def name=(_); end
  def payload; end
  def payload=(_); end
  def result; end
  def result=(_); end
  def self.[](*arg0); end
  def self.inspect; end
  def self.keyword_init?; end
  def self.members; end
  def self.new(*arg0); end
end
class Flipper::Instrumenters::Noop
  def self.instrument(_name, payload = nil); end
end
module Flipper::Identifier
  def flipper_id; end
end
module Flipper::Middleware
end
class Flipper::Middleware::Memoizer
  def call(env); end
  def initialize(app, opts = nil); end
  def memoize?(request); end
  def memoized_call(env); end
end
class Flipper::Middleware::SetupEnv
  def call!(env); end
  def call(env); end
  def flipper; end
  def initialize(app, flipper_or_block = nil, options = nil); end
end
class Flipper::Registry
  def add(key, value); end
  def clear; end
  def each(&block); end
  def get(key); end
  def initialize(source = nil); end
  def key?(key); end
  def keys; end
  def values; end
  include Enumerable
end
class Flipper::Registry::Error < StandardError
end
class Flipper::Registry::DuplicateKey < Flipper::Registry::Error
end
class Flipper::Registry::KeyNotFound < Flipper::Registry::Error
  def initialize(key); end
  def key; end
end
module Flipper::Types
end
class Flipper::Types::Actor < Flipper::Type
  def initialize(thing); end
  def method_missing(name, *args, **kwargs, &block); end
  def respond_to?(*args); end
  def self.wrappable?(thing); end
  def thing; end
end
class Flipper::Types::Boolean < Flipper::Type
  def initialize(value = nil); end
end
class Flipper::Types::Group < Flipper::Type
  def call_with_no_context?(block); end
  def initialize(name, &block); end
  def match?(thing, context); end
  def name; end
  def self.wrap(group_or_name); end
end
class Flipper::Types::Percentage < Flipper::Type
  def initialize(value); end
end
class Flipper::Types::PercentageOfActors < Flipper::Types::Percentage
end
class Flipper::Types::PercentageOfTime < Flipper::Types::Percentage
end
class Flipper::Railtie < Rails::Railtie
end
module Flipper::Instrumentation
end
class Flipper::Instrumentation::LogSubscriber < ActiveSupport::LogSubscriber
end