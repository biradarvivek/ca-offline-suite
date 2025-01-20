const { ipcMain } = require('electron');
const sessionManager = require('../SessionManager');
const licenseManager = require('../LicenseManager');

function registerAuthHandlers() {
    // Handle login
    ipcMain.handle('auth:login', async (event, userData) => {
        try {
            console.log('Login data:', userData);
            // return sessionManager.setUser(userData);
            return { success: true, user: userData };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    });

    // Handle logout
    ipcMain.handle('auth:logout', async () => {
        try {
            return sessionManager.clearUser();
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    });

    // Get user session
    ipcMain.handle('auth:getUser', () => {
        return sessionManager.user;
    });

    // Update user data
    ipcMain.handle('auth:updateUser', async (event, userData) => {
        try {
            return sessionManager.updateUser(userData);
        } catch (error) {
            console.error('Update user error:', error);
            return { success: false, error: error.message };
        }
    });

    ipcMain.handle("auth:signUp", async () => {

        const result = await licenseManager.validateAndStoreLicense(credentials);

        if (result.success) {
            const userAlreadyExists = await db.select(
                exists(db.select().from(users).where(eq(users.email, credentials.email)))
              );
              if (userAlreadyExists) {
                return { success: false, error: "User already exists." };
              }

            // const user = await db.insert(users).values({ ...credentials }).returning({ id: users.id }).get();

            // Step 3: Create New User
            const hashedPassword = await bcrypt.hash(credentials.password, 10);

            const dateJoined = Math.floor(Date.now() / 1000);

            console.log("dateJoined : ", dateJoined, "HashPassword : ", hashedPassword);

            // const newUser = await db
            // .insert(users)
            // .values({
            //     name: credentials.name || credentials.email.split("@")[0],
            //     email: credentials.email,
            //     password: hashedPassword,
            //     dateJoined: dateJoined,
            // })
            // .returning();

            return {
                success: true,
                message: "User created successfully.",
                user: newUser[0],
            };
            return { success: true, user: user };
        }

    });

    // ipcMain.handle("license:activate", async (event, credentials) => {
    //     try {
    //         const result = await licenseManager.validateAndStoreLicense(credentials);
    //         return { success: true };
    //     } catch (error) {
    //         console.error("Error retrieving license key:", error);
    //         return { success: false, message: "Failed to retrieve license key." };
    //     }
    // });

    ipcMain.handle("license:check", async () => {
        try {
            const isValid = await licenseManager.checkActivation(licenseKey);

            return { success: isValid, message: isValid ? "License key is valid." : "Invalid license key." };
        } catch (error) {
            console.error("Error validating license key:", error);
            return { success: false, message: "Failed to validate license key." };
        }
    });

}

module.exports = { registerAuthHandlers };