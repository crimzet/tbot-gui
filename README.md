# tbot-gui

# Desciption
The tbot-gui is an innovative open-source software project hosted on GitHub designed to simplify the process of creating simple Telegram bots. With a user-friendly graphical user interface (GUI), this program empowers developers and enthusiasts, whether beginners or experienced coders, to effortlessly craft and customize their own Telegram bots without the need for extensive programming knowledge.

# Key Features:

1. Intuitive GUI: The tbot-gui boasts an easy-to-navigate and intuitive interface, ensuring that users can create Telegram bots without writing a single line of code. It offers a visual drag-and-drop approach for building bot functionality.
2. Bot Customization: Users can define their bot's behavior, messages, and responses by configuring settings within the GUI. This customization extends to defining bot commands, setting up automated responses, and managing user interactions.
3. Message Handling: The tbot-gui simplifies the process of managing incoming and outgoing messages. Users can easily set up triggers and actions to handle specific keywords or phrases, making it a breeze to create bots that engage users effectively.
4. (TODO) Plugin System: For more advanced users, the tbot-gui includes a plugin system that enables the integration of additional features and external services, expanding the bot's capabilities.
5. Real-time Preview: The GUI provides a real-time preview of the bot's behavior, allowing developers to see how their bot will respond to different inputs.

# Contributions and Collaboration:

This project welcomes contributions from the open-source community. Developers, designers, and Telegram bot enthusiasts can collaborate to enhance the tbot-gui, add new features, improve its user experience, and fix bugs. Detailed guidelines for contributing can be found in the project's GitHub repository.

# Get Started:

You can run the program in dev mode using the following commands:

```bash
git clone https://github.com/crimzet/tbot-gui.git
cd tbot-gui
npm start
```

## Navigation

Here you will find description of each button in addition with their functions:

<img src="./change.svg" alt="change" width="50"></img> - changes your selected Telegram bot. Takes API token, which is unique for every bot. Has to be used first to proceed

<img src="./add.svg" alt="add" width="50"></img> - Adds a new command for the bot. Enter your command (ex. /hello) into the first input field. Enter the responce that the bot will produce into the second input field. After filling all the input fields, press *'save'* button to save the command (as it fill not be saved otherwise). Similarly, the command can be deleted via a *'delete'* button.

<img src="./help.svg" alt="help" width="50"></img> - Opens an electron *About page*.

<img src="./reload.svg" alt="reload" width="50"></img> - Reloads the app. Note: **The bot token will be reset, and so do its commands!**. Should be used in case any error occurs.
