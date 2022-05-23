# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: true
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/redis-objects/all/redis-objects.rbi
#
# redis-objects-1.6.0

class Redis
end
module Redis::Objects
  def self.included(klass); end
  def self.redis; end
  def self.redis=(conn); end
end
class Redis::Objects::ConnectionPoolProxy
  def initialize(pool); end
  def method_missing(name, *args, **, &block); end
  def respond_to_missing?(name, include_all = nil); end
  def self.proxy_if_needed(conn); end
  def self.should_proxy?(conn); end
end
class Redis::Objects::NotConnected < StandardError
end
class Redis::Objects::NilObjectId < StandardError
end
module Redis::Objects::ClassMethods
  def first_ancestor_with(name); end
  def redis; end
  def redis=(conn); end
  def redis_field_key(name, id = nil, context = nil); end
  def redis_field_redis(name); end
  def redis_id_field(id = nil); end
  def redis_objects; end
  def redis_objects=(arg0); end
  def redis_options(name); end
  def redis_prefix(klass = nil); end
  def redis_prefix=(redis_prefix); end
end
module Redis::Objects::InstanceMethods
  def redis; end
  def redis_delete_objects; end
  def redis_field_key(name); end
  def redis_field_redis(name); end
  def redis_instance_keys; end
  def redis_objects; end
  def redis_options(name); end
end
module Redis::Helpers
end
module Redis::Helpers::CoreCommands
end
class Redis::BaseObject
  include Redis::Helpers::CoreCommands
end
class Redis::Counter < Redis::BaseObject
end
class Redis::Objects::UndefinedCounter < StandardError
end
class Redis::Objects::MissingID < StandardError
end
module Redis::Objects::Counters
end
module Redis::Objects::Counters::ClassMethods
end
module Redis::Objects::Counters::InstanceMethods
end
class Redis::EnumerableObject < Redis::BaseObject
  include Enumerable
end
class Redis::List < Redis::EnumerableObject
end
module Redis::Objects::Lists
end
module Redis::Objects::Lists::ClassMethods
end
module Redis::Objects::Lists::InstanceMethods
end
class Redis::Lock < Redis::BaseObject
end
class Redis::Lock::LockTimeout < StandardError
end
class Redis::Objects::UndefinedLock < StandardError
end
module Redis::Objects::Locks
end
module Redis::Objects::Locks::ClassMethods
end
class Redis::Set < Redis::EnumerableObject
end
module Redis::Objects::Sets
end
module Redis::Objects::Sets::ClassMethods
end
module Redis::Objects::Sets::InstanceMethods
end
class Redis::SortedSet < Redis::EnumerableObject
end
module Redis::Objects::SortedSets
end
module Redis::Objects::SortedSets::ClassMethods
end
module Redis::Objects::SortedSets::InstanceMethods
end
class Redis::Value < Redis::BaseObject
end
module Redis::Objects::Values
end
module Redis::Objects::Values::ClassMethods
end
module Redis::Objects::Values::InstanceMethods
end
class Redis::HashKey < Redis::EnumerableObject
end
module Redis::Objects::Hashes
end
module Redis::Objects::Hashes::ClassMethods
end
module Redis::Objects::Hashes::InstanceMethods
end