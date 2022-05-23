# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: strict
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/easymon/all/easymon.rbi
#
# easymon-1.6.1

module Easymon
  def self.authorize_with=(block); end
  def self.authorized?(request); end
  def self.has_before_action?; end
  def self.has_render_plain?; end
  def self.mountable_engine?; end
  def self.rails2?; end
  def self.rails30?; end
  def self.rails_newer_than?(version); end
  def self.rails_version; end
  def self.railtie_helpers_paths; end
  def self.railtie_namespace; end
  def self.railtie_routes_url_helpers(include_path_helpers = nil); end
  def self.routes(mapper, path = nil); end
  def self.table_name_prefix; end
  def self.timing_to_ms(timing = nil); end
  def self.use_relative_model_naming?; end
end
class Easymon::Engine < Rails::Engine
end
module Anonymous_Module_36
end
module Anonymous_Module_37
end
class Easymon::Checklist
  def as_json(*args); end
  def check; end
  def empty?(*args, **, &block); end
  def fetch(name); end
  def include?(*args, **, &block); end
  def initialize(items = nil); end
  def items; end
  def items=(arg0); end
  def response_status; end
  def results; end
  def results=(arg0); end
  def size(*args, **, &block); end
  def success?; end
  def timing; end
  def to_hash; end
  def to_s; end
  def to_text; end
  extend Forwardable
end
class Easymon::Repository
  def repository; end
  def self.add(name, check, is_critical = nil); end
  def self.all; end
  def self.critical; end
  def self.fetch(name); end
  def self.names; end
  def self.remove(name); end
  def self.repository; end
end
class Easymon::Result
  def as_json(options = nil); end
  def critical; end
  def critical=(arg0); end
  def initialize(result, timing, is_critical = nil); end
  def is_critical?; end
  def message; end
  def message=(arg0); end
  def response_status; end
  def success; end
  def success=(arg0); end
  def success?; end
  def timing; end
  def timing=(arg0); end
  def to_hash; end
  def to_s; end
end
class Easymon::ActiveRecordCheck
  def check; end
  def database_up?; end
  def initialize(klass); end
  def klass; end
  def klass=(arg0); end
end
class Easymon::ActiveRecordMysqlWriteableCheck
  def check; end
  def database_writeable?; end
  def initialize(klass, makara = nil); end
  def klass; end
  def klass=(arg0); end
end
class Easymon::SplitActiveRecordCheck
  def block; end
  def block=(arg0); end
  def check; end
  def database_up?(connection); end
  def initialize(&block); end
  def results; end
  def results=(arg0); end
end
class Easymon::RedisCheck
  def check; end
  def config; end
  def config=(arg0); end
  def initialize(config); end
  def redis_up?; end
end
class Easymon::RedisWriteableCheck
  def check; end
  def config; end
  def config=(arg0); end
  def initialize(config); end
  def redis_writeable?; end
end
class Easymon::MemcachedCheck
  def cache; end
  def cache=(arg0); end
  def check; end
  def initialize(cache); end
  def memcached_up?; end
end
class Easymon::SemaphoreCheck
  def check; end
  def file_name; end
  def file_name=(arg0); end
  def initialize(file_name); end
  def semaphore_exists?; end
end
class Easymon::TrafficEnabledCheck < Easymon::SemaphoreCheck
  def check; end
end
class Easymon::HttpCheck
  def check; end
  def http_head(url); end
  def http_up?(url); end
  def initialize(url); end
  def url; end
  def url=(arg0); end
end
module Easymon::Testing
  def stub_check(name); end
  def stub_service_failure(name); end
  def stub_service_success(name); end
  extend Easymon::Testing
end
class Easymon::NoSuchCheck < StandardError
end
module Anonymous_Module_38
  extend ActiveSupport::Concern
  extend Anonymous_Module_36
  extend Anonymous_Module_37
  include ActionDispatch::Routing::UrlFor
  include Anonymous_Module_36
  include Anonymous_Module_37
end
class Easymon::ApplicationController < ActionController::Base
  include ActionDispatch::Routing::UrlFor
  include Anonymous_Module_38
end
class Easymon::ChecksController < Easymon::ApplicationController
  include Anonymous_Module_38
end