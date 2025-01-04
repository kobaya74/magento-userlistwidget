define(['jquery', 'mage/translate'], function ($) {
    'use strict';

    return function (config) {
        /* eslint one-var: ["error", { var: "never" }] */

        /** UserList Class */
        class UserList {
            /**
             * Constructor to initialize configurations
             * @param {Object} config - imported config from PHTML file
             */
            constructor(config) {
                const { apiUrl, userList, submitButton } = config;

                this.apiUrl = apiUrl;
                this.userList = userList;
                this.submitButton = submitButton;
                this.emailText = $.mage.__('Send me an email');
                this.userListEl = document.querySelector(this.userList);
                this.submitButtonEl = document.querySelector(this.submitButton);
                this.usersFetched = false;
            }

            /**
             * Static method that runs a class
             * @param {Object} config - imported config from PHTML file
             */
            static create(config) {
                const instance = new UserList(config);

                instance.#init(); // Automatically initialize
                return instance;
            }

            /** Main initialization entry point */
            #init() {
                this.#addButtonClickListener();
            }

            /** Adds an event listener to the button */
            #addButtonClickListener() {
                this.submitButtonEl.addEventListener('click', () =>
                    this.#onSubmitButtonClick()
                );
            }

            /** Handles the submit button click */
            async #onSubmitButtonClick() {
                if (this.usersFetched) {
                    throw new Error('Users have already been added!');
                }
                await this.#fetchAndRenderUsers();
            }

            /** Creates a loader and attaches it to the DOM */
            #showLoader() {
                const loader = document.createElement('div');

                loader.classList.add('loader');
                loader.innerHTML = '<div class="spinner"></div>';
                this.userListEl.appendChild(loader);
                return loader;
            }

            /**
             * Hides the loader element
             * @param {HTMLElement} loader - loader element to remove
             */
            #hideLoader(loader) {
                if (loader && loader.remove) {
                    loader.remove();
                }
            }

            /** Handles API call and rendering */
            async #fetchAndRenderUsers() {
                const loader = this.#showLoader();

                try {
                    const users = await this.#fetchUsers();

                    if (users.length) {
                        this.#renderUserList(users);
                    }
                } catch (error) {
                    throw new Error(`Error fetching users: ${error.message}`);
                } finally {
                    this.#hideLoader(loader);
                }
            }

            /**
             * Fetches user data from the API
             * @returns {Promise<Object[]>} - array of user objects
             */
            async #fetchUsers() {
                const response = await fetch(this.apiUrl);

                if (!response.ok) {
                    throw new Error(
                        `API responded with status ${response.status}`
                    );
                }
                const result = await response.json();

                return result.data || [];
            }

            /**
             * Renders the user list on the page
             * @param {Object[]} users - array of fetched user objects
             */
            #renderUserList(users) {
                const usersFragment = document.createDocumentFragment();

                users.forEach((user) => {
                    const userEl = this.#createUserElement(user);

                    usersFragment.appendChild(userEl);
                });

                this.userListEl.appendChild(usersFragment);
                this.#disableSubmitButton();
            }

            /**
             * Creates a user list element
             * @param {Object} user - user object containing details
             * @returns {HTMLElement} - formatted user list item
             */
            #createUserElement(user) {
                const {
                    avatar,
                    first_name: firstName,
                    last_name: lastName,
                    email
                } = user;
                const userEl = document.createElement('li');

                userEl.classList.add('user');
                userEl.innerHTML = `
                    <img class="avatar" src="${avatar}" alt="${firstName}_${lastName}"/>
                    <div class="name">${firstName} ${lastName}</div>
                    <a href="mailto:${email}" class="mail">${this.emailText}</a>
                `;
                return userEl;
            }

            /** Disables the submit button after fetching users */
            #disableSubmitButton() {
                this.submitButtonEl.disabled = true;
                this.usersFetched = true;
            }
        }

        // Create and initialize the user list
        UserList.create(config);
    };
});
