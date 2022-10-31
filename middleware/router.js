const KoaRouter = require("koa-router");
const ContactController = require("../controllers/ContactController");
const router = new KoaRouter();

router.get("/", async (ctx) => (ctx.body = "Welcome to the contacts API!!"));

// * Contact Routes
router.get("/contact", ContactController.index);
router.get("/contact/:id", ContactController.show);
router.post("/contact", ContactController.store);
router.put("/contact/:id", ContactController.update);
router.delete("/contact/:id", ContactController.destroy);

module.exports = router;
