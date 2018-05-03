//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

namespace egret.sys {



    /**
     * @private
     * 位图渲染节点
     */
    export class NormalBitmapNode extends RenderNode {

        public constructor() {
            super();
            this.type = RenderNodeType.NormalBitmapNode;
        }
        /**
         * 要绘制的位图
         */
        public image: BitmapData = null;
        /**
         * 控制在缩放时是否对位图进行平滑处理。
         */
        public smoothing: boolean = true;
        /**
         * 图片宽度。WebGL渲染使用
         */
        public imageWidth: number;
        /**
         * 图片高度。WebGL渲染使用
         */
        public imageHeight: number;
        /**
         * 翻转
         */
        public rotated: boolean = false;

        public sourceX: number;
        public sourceY: number;
        public sourceW: number;
        public sourceH: number;
        public drawX: number;
        public drawY: number;
        public drawW: number;
        public drawH: number;
        /**
         * 存放uv信息,
         * 会适应rotated进行调整
         * 存放uv四个顶点的信息
         */

        public uvX_LT: number;
        public uvX_RT: number;
        public uvX_LB: number;
        public uvX_RB: number;

        public uvY_LT: number;
        public uvY_RT: number;
        public uvY_LB: number;
        public uvY_RB: number;

        /**
         * 绘制一次位图
         */
        public drawImage(sourceX: number, sourceY: number, sourceW: number, sourceH: number,
            drawX: number, drawY: number, drawW: number, drawH: number): void {
            let self = this;
            self.sourceX = sourceX;
            self.sourceY = sourceY;
            self.sourceW = sourceW;
            self.sourceH = sourceH;
            self.drawX = drawX;
            self.drawY = drawY;
            self.drawW = drawW;
            self.drawH = drawH;
            self.renderCount = 1;

            let _sourceX = self.sourceX / this.imageWidth;
            let _sourceY = self.sourceY / this.imageHeight;
            let _sourceWidth: number;
            let _sourceHeight: number;
            if (this.rotated) {
                //逆时针旋转
                _sourceWidth = self.sourceH / this.imageWidth;
                _sourceHeight = self.sourceW / this.imageHeight;

                self.uvX_LT = _sourceX + _sourceWidth;
                self.uvY_LT = _sourceY;
                self.uvX_RT = _sourceX + _sourceWidth;
                self.uvY_RT = _sourceY + _sourceHeight;
                self.uvX_RB = _sourceX;
                self.uvY_RB = _sourceY + _sourceHeight;
                self.uvX_LB = _sourceX;
                self.uvY_LB = _sourceY;

            } else {
                _sourceWidth = self.sourceW / this.imageWidth;
                _sourceHeight = self.sourceH / this.imageHeight;

                self.uvX_LT = _sourceX;
                self.uvY_LT = _sourceY;
                self.uvX_RT = _sourceX + _sourceWidth;
                self.uvY_RT = _sourceY;
                self.uvX_RB = _sourceX + _sourceWidth;
                self.uvY_RB = _sourceY + _sourceHeight;
                self.uvX_LB = _sourceX;
                self.uvY_LB = _sourceY + _sourceHeight;
            }

        }

        /**
         * 在显示对象的$updateRenderNode()方法被调用前，自动清空自身的drawData数据。
         */
        public cleanBeforeRender(): void {
            super.cleanBeforeRender();
            this.image = null;
        }
    }
}