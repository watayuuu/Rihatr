| encrypted_password | string | null: false               || encrypted_password | string | null: false               || encrypted_password | string | null: false               |# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# テーブル設計

## usersテーブル
| Column             | Type   | Options                   |
| ------------------ | ------ | ------------------------- |
| nickname           | string | null: false               |
| last_name          | string | null: false               |
| first_name         | string | null: false               |
| last_name_kana     | string | null: false               |
| first_name_kana    | string | null: false               |
| occupation         | string | null: false               |

### Association
- has_many :packages




## packagesテーブル
| Column                | Type       | Options                        |
| --------------------- | ---------  | ------------------------------ |
| package_title         | string     | null: false                    |
| training_id           | references | null: false, foreign_key: true |
| training_id1          | references | foreign_key: true              |
| training_id2          | references | foreign_key: true              |
| training_id3          | references | foreign_key: true              |
| user                  | references | null: false, foreign_key: true |


## training_packagesテーブル
| Column                | Type       | Options                        |
| --------------------- | ---------  | ------------------------------ |
| package               | references | null: false, foreign_key: true |
| training              | references | null: false, foreign_key: true |

### Association



## trainingsテーブル
| Column                | Type    | Options                   |
| --------------------- | ------  | ------------------------- |
| training_title        | string  | null: false               |
| mascle_name           | string  | null: false               |
| explanation           | text    | null: false               |
| step1_comment         | text    | null: false               |
| step2_comment         | text    | null: false               |
| step3_comment         | text    | null: false               |
| step4_comment         | text    | null: false               |
| shoulder              | boolean |                           |
| elbow                 | boolean |                           |
| hand_fingers          | boolean |                           |
| hip                   | boolean |                           |
| knee                  | boolean |                           |
| ankle                 | boolean |                           |
| front_trunk           | boolean |                           |
| back_trunk            | boolean |                           |
| composite             | boolean |                           |
| supine                | boolean |                           |
| prone                 | boolean |                           |
| lateral               | boolean |                           |
| sitting               | boolean |                           |
| standing              | boolean |                           |
| fours                 | boolean |                           |
| stretch               | boolean |                           |
| muscle_training       | boolean |                           |
| stability             | boolean |                           |

### Association
- has_many : training_categories
- has_many :training, through: :training_categories

