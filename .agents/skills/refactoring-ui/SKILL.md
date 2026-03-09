---
name: refactoring-ui
description: UI design best practices from the Refactoring UI book by Adam Wathan & Steve Schoger. Use when designing user interfaces, establishing visual hierarchy, working with layout, spacing, typography, color, depth, images, and finishing touches.
---

# Refactoring UI: Best Practices for Modern Web Design

Comprehensive guide to UI design principles based on the book "Refactoring UI" by Adam Wathan & Steve Schoger. Covers starting from scratch, visual hierarchy, layout, typography, color, depth, images, and finishing touches.

## When to Apply

Reference these guidelines when:
- Starting a new UI design project
- Improving visual hierarchy and layout
- Choosing typography, colors, and spacing systems
- Adding depth and working with images
- Polishing interface details

## Table of Contents

- [Starting from Scratch](#starting-from-scratch)
- [Hierarchy is Everything](#hierarchy-is-everything)
- [Layout and Spacing](#layout-and-spacing)
- [Designing Text](#designing-text)
- [Working with Color](#working-with-color)
- [Creating Depth](#creating-depth)
- [Working with Images](#working-with-images)
- [Finishing Touches](#finishing-touches)
- [Leveling Up](#leveling-up)

# Starting from Scratch

## Start with a feature, not a layout

When you start the design for a new app idea, what do you design first? If it's the navigation bar at the top of the page, you're making a mistake.

The easiest way to find yourself frustrated and stuck when working on a new design is to start by trying to "design the app." When most people think about "designing the app", they're thinking about the shell.

Should it have a top nav, or a sidebar? Should the navigation items be on the left, or on the right? Should the page content be in a container, or should it be full-width? Where should the logo go?

The thing is, an "app" is actually a collection of features. Before you've designed a few features, you don't even have the information you need to make a decision about how the navigation should work. No wonder it's frustrating!

Instead of starting with the shell, start with a piece of actual functionality. For example, say you're building a flight booking service. You could start with a feature like "searching for a flight".

Your interface will need:
- A field for the departure city
- A field for the destination city
- A field for the departure date
- A field for the return date
- A button to perform the search

Start with that.

Hell, you might not even need that other stuff anyways — it worked for Google.

## Detail comes later

In the earliest stages of designing a new feature, it's important that you don't get hung up making low-level decisions about things like typefaces, shadows, icons, etc.

That stuff will all matter eventually, but it doesn't matter right now.

If you have trouble ignoring the details when working in a high fidelity environment like the browser or your favorite design tool, one trick Jason Fried of Basecamp likes to use is to design on paper using a thick Sharpie. Obsessing over little details just isn't possible with a Sharpie, so it can be a great way to quickly explore a bunch of different layout ideas.

### Hold the color

Even when you're ready to refine an idea in higher fidelity, resist the temptation to introduce color right away.

By designing in grayscale, you're forced to use spacing, contrast, and size to do all of the heavy lifting.

It's a little more challenging, but you'll end up with a clearer interface with a strong hierarchy that's easy to enhance with color later.

### Don't over-invest

The whole point of designing in low-fidelity is to be able to move fast, so you can start building the real thing as soon as possible.

Sketches and wireframes are disposable — users can't do anything with static mockups. Use them to explore your ideas, and leave them behind when you've made a decision.

## Don't design too much

You don't need to design every single feature in an app before you move on to implementation; in fact, it's better if you don't.

Figuring out how every feature in a product should interact and how every edge case should look is really hard, especially in the abstract.

How should this screen look if the user has 2000 contacts? Where should the error message go in this form? How should this calendar look when there are two events scheduled at the same time?

You're setting yourself up for frustration by trying to figure this stuff out using only a design tool and your imagination.

### Work in cycles

Instead of designing everything up front, work in short cycles. Start by designing a simple version of the next feature you want to build.

Once you're happy with the basic design, make it real.

You'll probably run into some unexpected complexity along the way, but that's the point — it's a lot easier to fix design problems in an interface you can actually use than it is to imagine every edge case in advance.

Iterate on the working design until there are no more problems left to solve, then jump back into design mode and start working on the next feature.

Don't get overwhelmed working in the abstract. Build the real thing as early as possible so your imagination doesn't have to do all the heavy lifting.

### Be a pessimist

Don't imply functionality in your designs that you aren't ready to build.

For example, say you're working on a comment system for a project management tool. You know that one day, you'd like users to be able to attach files to their comments, so you include an attachments section in your design.

You get deep into implementation only to discover that supporting attachments is going to be a lot more work than you anticipated. There's no way you have time to finish it right now, so the whole commenting system sits on the backburner while you take care of other priorities.

The thing is, a comment system with no attachments would still have been better than no comment system at all, but because you planned to include it from day one you've got nothing you can ship.

When you're designing a new feature, expect it to be hard to build. Designing the smallest useful version you can ship reduces that risk considerably.

If part of a feature is a "nice-to-have", design it later. Build the simple version first and you'll always have something to fall back on.

## Choose a personality

Every design has some sort of personality. A banking site might try to communicate secure and professional, while a trendy new startup might have a design that feels fun and playful.

On the surface, giving a design a particular personality might sound abstract and handwavy, but a lot of it is determined by a few solid, concrete factors.

### Font choice

Typography plays a huge part in determining how a design feels.

If you want an elegant or classic look, you might want to incorporate a serif typeface in your design.

For a playful look, you could use a rounded sans serif.

If you're going for a plainer look, or want to rely on other elements to provide the personality, a neutral sans serif works great.

### Color

There's a lot of science out there on the psychology of color, but in practice, you really just need to pay attention to how different colors feel to you.

Blue is safe and familiar — nobody ever complains about blue.

Gold might say "expensive" and "sophisticated".

Pink is a bit more fun, and not so serious.

While trying to choose colors using only psychology isn't super practical — a lot of it is just about what looks good to you — it can be helpful to think about when you're trying to understand why you think a color is the right fit.

### Border radius

As small of a detail as it sounds, if and how much you round the corners in your design can have a big impact on the overall feel.

A small border radius is pretty neutral, and doesn't really communicate much of a personality on its own.

A large border radius starts to feel more playful.

…while no border radius at all feels a lot more serious or formal.

Whatever you choose, it's important to stay consistent. Mixing square corners with rounded corners in the same interface almost always looks worse than sticking with one or the other.

### Language

While not a visual design technique per se, the words you use in an interface have a massive influence on the overall personality.

Using a less personal tone might feel more official or professional.

…while using friendlier, more casual language makes a site feel, well, friendlier.

Words are everywhere in a user interface, and choosing the right ones is just as (if not more) important than choosing the right color or typeface.

### Deciding what you actually want

A lot of the time you'll probably just have a gut feeling for the personality you're going for. But if you don't, a great way to simplify the decision is to take a look at other sites used by the people you want to reach.

If they are mostly pretty "serious business", maybe that's how your site should look too. If they are more playful with a bit of humor, maybe that's a better direction to take.

Just try not to borrow too much from direct competitors, you don't want to look like a second-rate version of something else.

## Limit your choices

Having millions of colors and thousands of fonts to choose from might sound nice in theory, but in practice it's usually a paralyzing curse.

And it's not just fonts and colors, either — you can easily waste time agonizing over almost any minor design decision.

Should this text be 12px or 13px? Should this box shadow have a 10% opacity or a 15% opacity? Should this avatar be 24px or 25px tall? Should I use a medium font weight for this button or semibold? Should this headline have a bottom margin of 18px or 20px?

When you're designing without constraints, decision-making is torture because there's always going to be more than one right choice.

For example, these buttons all have different background colors, but it's almost impossible to tell the difference between them by just looking at them.

How are you supposed to make a confident decision if none of these would really be bad choices?

### Define systems in advance

Instead of hand-picking values from a limitless pool any time you need to make a decision, start with a smaller set of options.

Don't reach for the color picker every time you need to pick a new shade of blue — choose from a set of 8-10 shades picked out ahead of time.

Similarly, don't tweak a font size one pixel at a time until it looks perfect. Define a restrictive type scale in advance and use that to make any future font size decisions.

When you build systems like this, you only have to do the hard work of picking the initial values once instead of every time you're designing a new piece of UI. It's a bit more work up front, but it's worth it — it'll save you a ton of decision fatigue down the road.

### Designing by process of elimination

When you're designing using a constrained set of values, decision-making is a lot easier because there are a lot fewer "right" choices.

For example, say you're trying to choose a size for an icon. You've defined a sizing scale in advance where your only small-to-medium sized options are 12px, 16px, 24px, and 32px.

To pick the best option, start by taking a guess at which one will look best, maybe 16px. Then try the values on either side (12px and 24px) for comparison.

Chances are, two of those options will seem like obviously bad choices. If it's the options on the outside, you're done — the middle option is the only good choice.

If one of the outer options looks best, do another comparison using that option as the "middle" value and make sure there's not a better choice.

This approach works for anything where you've defined a system. When you're limited to a set of options that all look noticeably different, picking the best one is a piece of cake.

### Systematize everything

The more systems you have in place, the faster you'll be able to work and the less you'll second guess your own decisions.

You'll want systems for things like:
- Font size
- Font weight
- Line height
- Color
- Margin
- Padding
- Width
- Height
- Box shadows
- Border radius
- Border width
- Opacity

…and anything else you run into where it feels like you're laboring over a low level design decision.

You don't have to define all of this stuff ahead of time, just make sure you're approaching design with a system-focused mindset. Look for opportunities to introduce new systems as you make new decisions, and try to avoid having to make the same minor decision twice.

Designing with systems is going to be a recurring theme throughout this book, and in later chapters we'll talk about building a lot of these systems in finer detail.

# Hierarchy is Everything

## Not all elements are equal

When you think of visual design as "styling things so they look good", it's easy to see why it might feel hard to achieve without innate artistic talent.

But it turns out that one of the biggest factors in making something "look good" has nothing to do with superficial styling at all.

Visual hierarchy refers to how important the elements in an interface appear in relation to one another, and it's the most effective tool you have for making something feel "designed".

When everything in an interface is competing for attention, it feels noisy and chaotic, like one big wall of content where it's not clear what actually matters.

When you deliberately de-emphasize secondary and tertiary information, and make an effort to highlight the elements that are most important, the result is immediately more pleasing, even though the color scheme, font choice, and layout haven't changed.

So how do you actually make this happen? In the following chapters, we'll cover a number of specific strategies you can use to introduce hierarchy into your designs.

## Size isn't everything

Relying too much on font size to control your hierarchy is a mistake — it often leads to primary content that's too large, and secondary content that's too small.

Instead of leaving all of the heavy lifting to font size alone, try using font weight or color to do the same job.

For example, making a primary element bolder lets you use a more reasonable font size, and often does a better job at communicating its importance anyways.

Similarly, using a softer color for supporting text instead of a tiny font size makes it clear that the text is secondary while sacrificing less on readability.

Try and stick to two or three colors:
- A dark color for primary content (like the headline of an article)
- A grey for secondary content (like the date an article was published)
- A lighter grey for tertiary content (maybe the copyright notice in a footer)

Similarly, two font weights are usually enough for UI work:
- A normal font weight (400 or 500 depending on the font) for most text
- A heavier font weight (600 or 700) for text you want to emphasize

Stay away from font weights under 400 for UI work — they can work for large headings but are too hard to read at smaller sizes. If you're considering using a lighter weight to de-emphasize some text, use a lighter color or smaller font size instead.

## Don't use grey text on colored backgrounds

Making text a lighter grey is a great way to de-emphasize it on white backgrounds, but it doesn't look so great on colored backgrounds.

That's because the effect we're actually seeing with grey on white is reduced contrast.

Making the text closer to the background color is what actually helps create hierarchy, not making it light grey.

You might think that the easiest way to achieve this is to use white text and reduce the opacity.

While this does reduce the contrast, it often results in text that looks dull, washed out, and sometimes even disabled.

Even worse, using this approach on top of an image or pattern means the background will show through the text.

A better approach is to hand-pick a new color, based on the background color.

Choose a color with the same hue, and adjust the saturation and lightness until it looks right to you.

Hand-picking a color this way makes it easy to reduce the contrast without the text looking faded.

## Emphasize by de-emphasizing

Sometimes you'll run into a situation where the main element of an interface isn't standing out enough, but there's nothing you can add to it to give it the emphasis it needs.

For example, despite trying to make this active nav item "pop" by giving it a different color, it still doesn't really stand out compared to the inactive items.

When you run into situations like this, instead of trying to further emphasize the element you want to draw attention to, figure out how you can de-emphasize the elements that are competing with it.

In this example, you could do that by giving the inactive items a softer color so they sit more in the background.

You can apply this thinking to bigger pieces of an interface as well. For example, if a sidebar feels like it's competing with your main content area, don't give it a background color — let the content sit directly on the page background instead.

## Labels are a last resort

Put down the accessibility pitchfork — this isn't about forms.

When presenting data to the user (especially data from the database), it's easy to fall into the trap of displaying it using a naive label: value format.

The problem with this approach is that it makes it difficult to present the data with any sort of hierarchy; every piece of data is given equal emphasis.

### You might not need a label at all

In a lot of situations, you can tell what a piece of data is just by looking at the format.

For example, janedoe@example.com is an email address, (555) 765-4321 is a phone number and $19.99 is a price.

When the format isn't enough, the context often is. When you see the phrase "Customer Support" listed below someone's name in an employee directory, you don't need a label to make the connection that that is the department the person works in.

When you're able to present data without labels, it's much easier to emphasize important or identifying information, making the interface easier to use while at the same time making it feel more "designed".

### Combine labels and values

Even when a piece of data isn't completely clear without a label, you can often avoid adding a label by adding clarifying text to the value.

For example, if you need to display inventory in an e-commerce interface, instead of "In stock: 12", try something like "12 left in stock".

If you're building a real estate app, something like "Bedrooms: 3" could simply become "3 bedrooms".

When you're able to combine labels and values into a single unit, it's much easier to give each piece of data meaningful styling without sacrificing on clarity.

### Labels are secondary

Sometimes you really do need a label; for example when you're displaying multiple pieces of similar data and they need to be easily scannable, like on a dashboard.

In these situations, add the label, but treat it as supporting content. The data itself is what matters, the label is just there for clarity.

De-emphasize the label by making it smaller, reducing the contrast, using a lighter font weight, or some combination of all three.

### When to emphasize a label

If you're designing an interface where you know the user will be looking for the label, it might make sense to emphasize the label instead of the data.

This is often the case on information-dense pages, like the technical specifications of a product.

If a user is trying to find out the dimensions of a smartphone, they're probably scanning the page for words like "depth", not "7.6mm".

Don't de-emphasize the data too much in these scenarios; it's still important information. Simply using a darker color for the label and a slightly lighter color for the value is often enough.

## Separate visual hierarchy from document hierarchy

It's important to use semantic markup when building for the web, which means you'll often be using heading tags like h1, h2, or h3 if you decide to add a title to part of an interface.

By default, web browsers assign progressively smaller font sizes to heading elements, so an h1 is pretty large, and an h6 is pretty small. This can be helpful for document-style content like articles or documentation, but it can encourage some bad decisions in application UIs.

Using an h1 tag to add a title like Manage Account to a page makes perfect sense semantically, but because we're trained to believe that h1 elements should be big, it's easy to fall into the trap of making those titles bigger than they really need to be.

A lot of the time, section titles act more like labels than headings — they are supportive content, they shouldn't be stealing all the attention.

Usually the content in that section should be the focus, not the title. That means that a lot of the time, titles should actually be pretty small.

## Balance weight and contrast

When you're trying to create hierarchy using a combination of font size, font weight, and color, it's easy to end up with a design that feels unbalanced.

For example, if you have a large, bold headline in a dark color, and then some small, light grey supporting text, the headline might feel too heavy compared to the text below it.

To balance things out, you might need to adjust the contrast of the headline to make it feel less heavy, or increase the font size or weight of the supporting text to make it feel more substantial.

The goal is to have a design where the visual weight of each element feels proportional to its importance, not just its size.

## Semantics are secondary

When you're building for the web, it's important to use semantic markup, but when it comes to visual design, semantics are secondary.

For example, if you have a piece of text that needs to look like a heading but semantically it's not a heading, use the visual treatment of a heading anyway.

Similarly, if you have something that looks like a button but semantically it's a link, make it look like a button.

The way something looks and behaves is more important than the underlying markup.

# Layout and Spacing

## Start with too much white space

When you're starting to lay out a new design, it's easy to fall into the trap of trying to fit as much as possible into the available space.

But cramming everything together makes it hard to see the hierarchy, and it makes the design feel cluttered and overwhelming.

Instead, start with way more white space than you think you need.

Give every element plenty of breathing room, and then gradually reduce the spacing as you refine the design.

You'll be surprised how much better the final result looks when you start with too much space instead of too little.

## Establish a spacing and sizing system

Just like with colors and fonts, having a system for spacing and sizing makes decision-making much easier.

Define a scale of spacing values (like 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px) and stick to it.

Use these values for margins, padding, widths, heights, and any other sizing decisions.

This creates consistency and makes it easier to adjust spacing across the design.

## You don't have to fill the whole screen

It's okay to have empty space. Not every pixel needs to be filled with content.

In fact, leaving some areas empty can make the design feel more focused and less overwhelming.

## Grids are overrated

You don't need a complex grid system to create good layouts.

Often, simple alignment and consistent spacing is enough.

Don't force everything into a grid if it doesn't fit naturally.

## Relative sizing doesn't scale

Using relative units like percentages can cause issues as designs grow.

Prefer fixed units for spacing and sizing to maintain consistency.

## Avoid ambiguous spacing

Make sure spacing between elements is intentional and consistent.

Ambiguous spacing can make the hierarchy unclear.

## Designing Text

## Establish a type scale

Choose a set of font sizes that work well together.

For example: 12px, 14px, 16px, 18px, 24px, 32px, 48px.

Use these sizes consistently for all text elements.

## Use good fonts

Choose fonts that are readable and appropriate for your design.

Sans-serif fonts are often good for UI.

## Keep your line length in check

Aim for 45-75 characters per line for optimal readability.

Adjust font size or container width to achieve this.

## Baseline, not center

Align text to the baseline, not the center, for better visual harmony.

## Line-height is proportional

Set line-height relative to font size (e.g., 1.5 for body text).

## Not every link needs a color

Use underlines or other indicators instead of color for links.

## Align with readability in mind

Left-align text for readability, unless there's a good reason not to.

## Use letter-spacing effectively

Adjust letter-spacing for headings or small text to improve readability.

# Working with Color

## Ditch hex for HSL

Use HSL color values for easier manipulation of hue, saturation, and lightness.

## You need more colors than you think

Build a palette with multiple shades of each color.

## Define your shades up front

Create a systematic approach to color shades (e.g., 50, 100, 200, etc.).

## Don't let lightness kill your saturation

Maintain saturation as you adjust lightness.

## Greys don't have to be grey

Use slightly tinted greys for better visual interest.

## Accessible doesn't have to mean ugly

Design for accessibility without sacrificing aesthetics.

## Don't rely on color alone

Use other cues like shape and position for information.

# Creating Depth

## Emulate a light source

Use consistent shadows to suggest lighting direction.

## Use shadows to convey elevation

Different shadow sizes for different elevations.

## Shadows can have two parts

Use key and ambient shadows for realism.

## Even flat designs can have depth

Subtle shadows and layering for flat designs.

## Overlap elements to create layers

Use z-index and positioning for depth.

# Working with Images

## Use good photos

Choose high-quality, relevant images.

## Text needs consistent contrast

Ensure text over images has sufficient contrast.

## Everything has an intended size

Size images appropriately for their purpose.

## Beware user-uploaded content

Plan for varying image qualities.

# Finishing Touches

## Supercharge the defaults

Enhance default styles for better design.

## Add color with accent borders

Use subtle borders for color accents.

## Decorate your backgrounds

Add patterns or textures to backgrounds.

## Don't overlook empty states

Design meaningful empty states.

## Use fewer borders

Minimize borders for cleaner design.

## Think outside the box

Be creative with design elements.

# Leveling Up

— Adam Wathan & Steve Schoger