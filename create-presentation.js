const pptxgen = require("pptxgenjs");

let pptx = new pptxgen();

// Define layout: 4:3 aspect ratio (960px × 720px)
pptx.defineLayout({ name: '4:3', width: 10, height: 7.5 });
pptx.layout = '4:3';

// Title slide
let slide1 = pptx.addSlide();
slide1.background = { color: '000000' };
slide1.addText('Distorted Desires', { x: 0.5, y: 3, w: 9, h: 2, fontSize: 72, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true, align: 'center' });
slide1.addText('The Battle Within', { x: 0.5, y: 5, w: 9, h: 1, fontSize: 48, color: 'cccccc', fontFace: 'Helvetica Neue', align: 'center' });

// Slide 2: Conflict illustration
let slide2 = pptx.addSlide();
slide2.background = { color: '000000' };
slide2.addText('The Root of Conflict', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide2.addText("I can guarantee you I know the answer. You wanted something and didn't have it. That's why you fought.\n\nYou wanted a clean kitchen and didn't have it, so you fought. You wanted more time and you didn't have it, so you fought.\n\nYou wanted some peace and quiet and didn't have it, so you fought. You wanted...and didn't have.", { x: 0.4, y: 1, w: 9, h: 5, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 3: James 4:1-2
let slide3 = pptx.addSlide();
slide3.background = { color: '000000' };
slide3.addText('James 4:1-2', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide3.addText("What causes quarrels and what causes fights among you? Is it not this, that your passions are at war within you?\n\nYou desire and do not have, so you murder. You covet and cannot obtain, so you fight and quarrel.", { x: 0.4, y: 1, w: 9, h: 5, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 4: Genesis 3:1-6
let slide4 = pptx.addSlide();
slide4.background = { color: '000000' };
slide4.addText('Genesis 3:1-6', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide4.addText("Now the serpent was more crafty than any other beast of the field that the Lord God had made. He said to the woman, 'Did God actually say, \"You shall not eat of any tree in the garden\"?'\n\nAnd the woman said to the serpent, 'We may eat of the fruit of the trees in the garden, but God said, \"You shall not eat of the fruit of the tree that is in the midst of the garden, neither shall you touch it, lest you die.\"'\n\nBut the serpent said to the woman, 'You will not surely die. For God knows that when you eat of it your eyes will be opened, and you will be like God, knowing good and evil.'\n\nSo when the woman saw that the tree was good for food, and that it was a delight to the eyes, and that the tree was to be desired to make one wise, she took of its fruit and ate, and she also gave some to her husband who was with her, and he ate.", { x: 0.4, y: 1, w: 9, h: 6, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 5: Lorenzo Albacete quote
let slide5 = pptx.addSlide();
slide5.background = { color: '000000' };
slide5.addText('Lorenzo Albacete', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide5.addText("There is only one temptation. All particular temptations are expressions of this one original or 'primordial' temptation. It is the temptation to believe the fulfillment of the desires of the human heart depends entirely on us.", { x: 0.4, y: 1, w: 9, h: 5, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 6: Romans 7:15,19
let slide6 = pptx.addSlide();
slide6.background = { color: '000000' };
slide6.addText('Romans 7:15,19', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide6.addText("For I do not understand my own actions. For I do not do what I want, but I do the very thing I hate...\n\nFor I do not do the good I want, but the evil I do not want is what I keep on doing.", { x: 0.4, y: 1, w: 9, h: 5, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 7: Colossians 3:5
let slide7 = pptx.addSlide();
slide7.background = { color: '000000' };
slide7.addText('Colossians 3:5', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide7.addText("Put to death therefore what is earthly in you: sexual immorality, impurity, passion, evil desire, and covetousness, which is idolatry.", { x: 0.4, y: 1, w: 9, h: 5, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 8: Psalm 115:4-8
let slide8 = pptx.addSlide();
slide8.background = { color: '000000' };
slide8.addText('Psalm 115:4-8', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide8.addText("Their idols are silver and gold, the work of human hands. They have mouths but do not speak; eyes but do not see.\n\nThey have ears, but do not hear; noses but do not smell. They have hands, but do not feel; feet, but do not walk; and they do not make a sound in their throat.\n\nThose who make them become like them; so do all who trust in them.", { x: 0.4, y: 1, w: 9, h: 6, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 9: Archibald Hart quote
let slide9 = pptx.addSlide();
slide9.background = { color: '000000' };
slide9.addText('Archibald Hart', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide9.addText("Today we have taken the pursuit of pleasure too far, and in so doing we have lost the ability to experience the very pleasure we are pursuing.\n\nConsistent overuse of the brain's pleasure circuits causes us to lose our capacity to experience pleasure.", { x: 0.4, y: 1, w: 9, h: 5, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 10: Romans 7:24-25
let slide10 = pptx.addSlide();
slide10.background = { color: '000000' };
slide10.addText('Romans 7:24-25', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide10.addText("Wretched man that I am! Who will deliver me from this body of death?\n\nThanks be to God through Jesus Christ our Lord!", { x: 0.4, y: 1, w: 9, h: 5, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 11: Sin through good things
let slide11 = pptx.addSlide();
slide11.background = { color: '000000' };
slide11.addText('Sin Through Good Things', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide11.addText("So the law is holy, and the commandment is holy and righteous and good. Did that which is good, then, bring death to me? By no means! It was sin, producing death in me through what is good.\n\nSin takes good things and distorts them so that they turn into bad things.", { x: 0.4, y: 1, w: 9, h: 6, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 12: Idolatry
let slide12 = pptx.addSlide();
slide12.background = { color: '000000' };
slide12.addText('The Futility of Idolatry', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide12.addText("At its core, covetousness is about distorted desires. It's not just about desiring things we don't have, but desiring the wrong things.\n\nWhen we chase after things that go against God's will and design, we are actually becoming less human—more like a dead, lifeless object.\n\nWe keep turning to things that will never fulfill those desires and never bring comfort, hoping it will be different this time. But it doesn't.", { x: 0.4, y: 1, w: 9, h: 6, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 13: Salvation
let slide13 = pptx.addSlide();
slide13.background = { color: '000000' };
slide13.addText('Salvation Through Jesus', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide13.addText("You cannot do it in your own strength. You cannot overcome your desires on your own. You cannot suppress your desires enough. You cannot fulfill your desires enough. None of that will work.\n\nThe only way you can ever be delivered from this mess is for Jesus to cleanse you of your sin and give you a new heart—and new desires to go along with that new heart.\n\nHe also promises to give you the Holy Spirit who begins to wage war against your sinful nature.", { x: 0.4, y: 1, w: 9, h: 6, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Slide 14: Ongoing battle
let slide14 = pptx.addSlide();
slide14.background = { color: '000000' };
slide14.addText('The Ongoing Battle', { x: 0.4, y: 0.3, w: 9, h: 1, fontSize: 46, color: 'ffffff', fontFace: 'Helvetica Neue', bold: true });
slide14.addText("When you become a Christian, the battle isn't over. It's actually just begun. Before you're a Christian there is no battle. Your sinful nature is having its way with you.\n\nBut once you become a Christian, the battle begins. The Spirit begins to wage war with your sinful nature. You begin to notice that you no longer desire the things you used to desire.\n\nThe reordering of our desires is a long, slow process. It doesn't happen overnight. Through prayer, reading God's Word, attending worship, and fellowship with other believers, Jesus and the Spirit begin to reorder our desires.", { x: 0.4, y: 1, w: 9, h: 6, fontSize: 36, color: 'ffffff', fontFace: 'Avenir', align: 'left' });

// Save the presentation
pptx.writeFile("distorted-desires-presentation.pptx").then(() => {
  console.log("Presentation created successfully!");
}).catch((err) => {
  console.error("Error creating presentation:", err);
});
