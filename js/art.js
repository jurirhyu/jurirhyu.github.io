class WorkList {
    /**
     *
     * @param {object} options
     */
    constructor(options) {
        const _defaults = {
            workItem: '.js-work-item',
            workItemPreviewList: '.js-work-preview-list',
            workItemImg: '.js-work-preview',

            //
            activeItemClass: 'is-active',

            //
            workCanvas: '.js-work-preview-canvas',
        };

        this.defaults = Object.assign({}, _defaults, options);

        if (this.getWorkItem().length > 0) {
            this.init();
            this.workItemHover(this.getWorkItem());
            this.workHover(this.getWorkItemPreviewList());
            this.initWorkCanvas();
        }
    }

    // region Getters

    /**
     *
     * @returns {*|jQuery|HTMLElement}
     */
    getWorkItem() {
        return $(this.defaults.workItem);
    }

    getWorkItemImg() {
        return $(this.defaults.workItemImg);
    }

    getWorkItemPreviewList() {
        return $(this.defaults.workItemPreviewList);
    }

    getWorkCanvas() {
        return $(this.defaults.workCanvas);
    }

    getCanvasEl() {
        return $(this.defaults.workCanvas).find('canvas');
    }

    // endregion

    init() {
        console.log('WorkList init()');
    }

    /**
     *
     * @param workItem
     */
    workItemHover(workItem) {
        workItem.on('mouseenter', (e) => {
            e.preventDefault();

            const workItemId = $(e.currentTarget).data('work-preview-id');

            this.workHoverEnter(workItemId);
        });

        workItem.on('mouseleave', () => {
            this.workHoverLeave();
        });
    }

    /**
     *
     * @param workContainer
     */
    workHover(workContainer) {
        $(document).on('mousemove', (ev) => {
            const decimalX = (ev.clientX / window.innerWidth) - 0.5;
            const decimalY = (ev.clientY / window.innerHeight) - 0.5;

            TweenMax.to(workContainer, 0.4, {
                x: 180 * decimalX,
                y: 90 * decimalY,
                ease: Power3.easeOut,
            });
        });

        // SETTINGS
        const workItem = $(this.defaults.workItem);
        const hoverDuration = 0.4;
        const opacityLevel = 0.3;


        // CONTEXT SHIFTING
        // mouseenter
        $(document).on('mouseenter', this.defaults.workItem, (ev) => {
            ev.preventDefault();

            const notItem = workItem.not(ev.currentTarget);

            TweenMax.to(ev.currentTarget, hoverDuration, {
                opacity: 1,
                ease: Power3.easeOut,
            });

            TweenMax.to(notItem, hoverDuration, {
                opacity: opacityLevel,
                x: 0,
                ease: Power3.easeOut,
            });
        });

        // mouseleave
        $(document).on('mouseleave', this.defaults.workItem, (ev) => {
            ev.preventDefault();

            const notItem = workItem.not(ev.currentTarget);

            TweenMax.to([ev.currentTarget, notItem], hoverDuration, {
                opacity: 1,
                ease: Power3.easeOut,
            });
        });
    }

    initWorkCanvas() {
        // CANVAS DIMENSIONS
        const canvasWidth = this.getWorkItemImg().innerWidth();
        const canvasHeight = this.getWorkItemImg().innerHeight();

        // CREATE PIXI APPLICATION
        const app = new PIXI.Application(
            canvasWidth,
            canvasHeight, {
                transparent: true,
            },
        );

        // APPEND CANVAS
        this.getWorkCanvas().append(app.view);

        // CREATE SLIDES CONTAINER
        this.slidesContainer = new PIXI.Container();
        app.stage.addChild(this.slidesContainer);

        // CREATE DISPLACEMENT MAP
        //const displacementMap = PIXI.Sprite.fromImage(this.getWorkCanvas().data('displacement-map'));
      
        const displacementMap = PIXI.Sprite.fromImage(this.getWorkCanvas().css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));

        // CREATE FILTER
        const filter = new PIXI.filters.DisplacementFilter(displacementMap);

        displacementMap.name = 'displacementMap';
        displacementMap.anchor.set(0.5);
        displacementMap.scale.set(1);
        displacementMap.position.set(canvasWidth / 2, canvasHeight / 2);

        app.stage.filterArea = app.screen;
        app.stage.filters = [filter];
        app.stage.addChild(displacementMap);

        // PIXI SPRITE ARRAY
        for (const spriteImage of this.getWorkItemImg()) {
            //const texture = new PIXI.Texture.fromImage($(spriteImage).data('work-preview'));
          const texture = new PIXI.Texture.fromImage($(spriteImage).css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
          
            const image = new PIXI.Sprite(texture);

            image.name = `workPreview`;
            image.alpha = 0;
            image.width = canvasWidth;
            image.height = canvasHeight;

            this.slidesContainer.addChild(image);
        }

        // DISPLACE TIMELINE
        this.displaceTl = new TimelineMax({
            paused: true,
        });

        this.displaceTl.add('start')
            .fromTo(this.getCanvasEl(), 0.4, {
                autoAlpha: 0,
            }, {
                autoAlpha: 1,
                ease: Power4.easeOut,
            }, "start")
            .fromTo(this.getCanvasEl(), 0.8, {
                scale: 1.5,
            }, {
                scale: 1,
                ease: Power4.easeOut,
            }, "start")
            .fromTo(
                filter.scale, 1.6, {
                    x: 150,
                    y: 150,
                },
                {
                    x: 0,
                    y: 0,
                    ease: Power4.easeOut,
                    onComplete: () => {

                    },
                }, "start",
            );

        return [this.slidesContainer, this.displaceTl];
    }

    workHoverEnter(layerId) {
        // SET ALPHA OF HOVERED CASE PREVIEW
        TweenMax.to(this.slidesContainer.children[layerId], 0.4, {
            alpha: 1,
            ease: Power3.easeOut,
            onStart: () => {
                this.displaceTl.progress(0);
                this.displaceTl.play();
            },
        });
    }

    workHoverLeave() {
        TweenMax.to(this.slidesContainer.children, 0.4, {
            alpha: 0,
            ease: Power3.easeOut,
        });
    }
}


new WorkList();