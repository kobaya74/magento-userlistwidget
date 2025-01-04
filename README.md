# Module Alex74 UserListWidget

    ``alex74/module-userlistwidget``

 - [Main Functionalities](#main-functionalities)
 - [Installation](#installation)
 - [Configuration](#configuration)

## Main Functionalities
Alex74 UserListWidget is a Magento 2 widget.

## Installation
### Type 1: Zip file

 - Unzip the zip file somewhere on local machine.
 - Create a folder "Alex74/UserListWidget" in the `app/code/`.
 - Copy files into newly created folder.
 - Enable the module by running `php bin/magento module:enable Alex74_UserListWidget`
 - Apply database updates by running `php bin/magento setup:upgrade`\*
 - Flush the cache by running `php bin/magento cache:flush`

### Type 2: Composer (not available at the moment)

 - Install the module composer by running `composer require alex74/module-userlistwidget`
 - enable the module by running `php bin/magento module:enable Alex74_UserListWidget`
 - apply database updates by running `php bin/magento setup:upgrade`\*
 - Flush the cache by running `php bin/magento cache:flush`

## Configuration
- Under Stores > Configuration > Alex74 > User List Widget set module to "Enabled".
- Add test API  https://reqres.in/api/users.
- Add widget using Content > Widgets > Add Widget.
- Under widget options add:
    * Widget Title (optional)
    * Provide API for users data (optional). Use API https://reqres.in/api/users as test API.
      * If not defined here, API will come from the Stores > Configuration > Alex74 > User List Widget > General Configuration >  API for users data.
      * This setting overrides the Stores > Configuration > Alex74 > User List Widget > General Configuration >  API for users data setting.

