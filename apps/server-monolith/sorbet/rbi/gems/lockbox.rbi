# This file is autogenerated. Do not edit it by hand. Regenerate it with:
#   srb rbi gems

# typed: true
#
# If you would like to make changes to this file, great! Please create the gem's shim here:
#
#   https://github.com/sorbet/sorbet-typed/new/master?filename=lib/lockbox/all/lockbox.rbi
#
# lockbox-0.6.8

module Lockbox
  def self.attribute_key(table:, attribute:, master_key: nil, encode: nil); end
  def self.default_options; end
  def self.default_options=(arg0); end
  def self.encrypts_action_text_body(**options); end
  def self.generate_key; end
  def self.generate_key_pair; end
  def self.master_key; end
  def self.master_key=(arg0); end
  def self.migrate(relation, batch_size: nil, restart: nil); end
  def self.new(**options); end
  def self.rotate(relation, attributes:, batch_size: nil); end
  def self.to_hex(str); end
  extend Lockbox::Padding
end
class Lockbox::AES_GCM
  def auth_tag_bytes; end
  def decrypt(nonce, ciphertext, associated_data); end
  def encrypt(nonce, message, associated_data); end
  def extract_auth_tag(bytes); end
  def fail_decryption; end
  def initialize(key); end
  def inspect; end
  def nonce_bytes; end
end
class Lockbox::Box
  def decrypt(ciphertext, associated_data: nil); end
  def encrypt(message, associated_data: nil); end
  def extract_nonce(box, bytes); end
  def generate_nonce(box); end
  def initialize(key: nil, algorithm: nil, encryption_key: nil, decryption_key: nil, padding: nil); end
  def inspect; end
end
module Lockbox::Calculations
  def pluck(*column_names); end
end
class Lockbox::Encryptor
  def check_string(str); end
  def copy_metadata(source, target); end
  def decrypt(ciphertext, **options); end
  def decrypt_io(io, **options); end
  def decrypt_str(ciphertext, **options); end
  def encrypt(message, **options); end
  def encrypt_io(io, **options); end
  def initialize(**options); end
end
class Lockbox::KeyGenerator
  def attribute_key(table:, attribute:); end
  def hash_hmac(hash, ikm, salt); end
  def hkdf(ikm, salt:, info:, length:, hash:); end
  def initialize(master_key); end
end
class Lockbox::IO < StringIO
  def content_type; end
  def content_type=(arg0); end
  def extracted_content_type; end
  def extracted_content_type=(arg0); end
  def original_filename; end
  def original_filename=(arg0); end
end
class Lockbox::Migrator
  def ar_relation?(relation); end
  def base_relation; end
  def each_batch(relation); end
  def initialize(relation, batch_size:); end
  def migrate(restart:); end
  def migrate_records(records, fields:, blind_indexes:, restart:, rotate:); end
  def model; end
  def mongoid_relation?(relation); end
  def perform(fields:, blind_indexes: nil, restart: nil, rotate: nil); end
  def perform_attachments(attachments:, restart:); end
  def rotate(attributes:); end
  def with_transaction; end
end
module Lockbox::Model
  def lockbox_encrypts(*attributes, **options); end
end
module Lockbox::Model::Attached
  def encrypts_attached(*attributes, **options); end
end
module Lockbox::Padding
  def pad!(str, size: nil); end
  def pad(str, **options); end
  def unpad!(str, size: nil); end
  def unpad(str, **options); end
end
class Lockbox::Utils
  def self.build_box(context, options, table, attribute); end
  def self.decode_key(key, size: nil, name: nil); end
  def self.decrypt_result(record, name, options, result); end
  def self.encrypt_attachable(record, name, attachable); end
  def self.encrypted?(record, name); end
  def self.encrypted_options(record, name); end
  def self.rebuild_attachable(attachment); end
end
class Lockbox::Railtie < Rails::Railtie
end
class Lockbox::LogSubscriber < ActiveSupport::LogSubscriber
end
class Lockbox::Error < StandardError
end
class Lockbox::DecryptionError < Lockbox::Error
end
class Lockbox::PaddingError < Lockbox::Error
end
module Lockbox::ActiveStorageExtensions
end
module Lockbox::ActiveStorageExtensions::Attached
end
module Lockbox::ActiveStorageExtensions::AttachedOne
end
module Lockbox::ActiveStorageExtensions::AttachedMany
end
module Lockbox::ActiveStorageExtensions::CreateOne
end
module Lockbox::ActiveStorageExtensions::Attachment
end
module Lockbox::ActiveStorageExtensions::Blob
end