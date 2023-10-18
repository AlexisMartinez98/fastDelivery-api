const request = require("supertest");
const app = require("../../server");

describe("POST, /login", ()=>{

    test("should login when credentials are valid", async () => {
        const userData = {
            email: "micauvilla23@gmail.com",
            password: "Mica123456",
        };
      
        
        const response = await request(app).post("/api/v1/user/login").send(userData );
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("_id")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("token")
    });

    test("It should give an error when credentials are invalid ", async () => {
        const userData = {
            email: "micauvilla23@gmail.com",
            password: "Pas123456",
        };
      
        const response = await request(app)
        .post("/api/v1/user/login ")
        .send(userData );
        
        
        expect(response.statusCode).toBe(401);
    });
    
    test("should return an error message when email is missing", async () => {
        const userData = {
            password: "Mica123456",
        };

        const response = await request(app).post("/api/v1/user/login").send(userData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("errors");
        expect(response.body.errors[1]).toHaveProperty("msg", "Email cannot be empty");
    });

    test("It should give an error when is not confirmed  ", async () => {
        const userData = {
            email: "test@example.com",
            password: "Pas123456",
            confirm: false
        };
        
        const response = await request(app)
        .post("/api/v1/user/login ")
        .send(userData );
        console.log(userData)
        
        expect(response.statusCode).toBe(403);
    });
    
})