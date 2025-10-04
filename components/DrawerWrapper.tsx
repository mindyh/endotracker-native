import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SHADOWS, SPACING } from "../constants/theme";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH_RATIO = Platform.OS === 'web' ? 0.4 : 0.85;
const ANIMATION_CONFIG = {
    OPEN: {
        overlay: { duration: 300, easing: Easing.out(Easing.quad) },
        drawer: { duration: 400, easing: Easing.out(Easing.cubic) },
    },
    CLOSE: {
        drawer: { duration: 300, easing: Easing.in(Easing.cubic) },
        overlay: { duration: 250, easing: Easing.in(Easing.quad) },
    },
};

interface DrawerWrapperProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function DrawerWrapper({ visible, onClose, title, children }: DrawerWrapperProps) {
    const [slideAnim] = useState(new Animated.Value(SCREEN_WIDTH));
    const [overlayOpacity] = useState(new Animated.Value(0));
    const [isAnimating, setIsAnimating] = useState(false);

    const handleCloseAnimation = useCallback(() => {
        if (isAnimating) return;

        setIsAnimating(true);

        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: SCREEN_WIDTH,
                ...ANIMATION_CONFIG.CLOSE.drawer,
                useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
                toValue: 0,
                ...ANIMATION_CONFIG.CLOSE.overlay,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setIsAnimating(false);
            onClose();
        });
    }, [isAnimating, slideAnim, overlayOpacity, onClose]);

    useEffect(() => {
        if (visible) {
            slideAnim.setValue(SCREEN_WIDTH);
            overlayOpacity.setValue(0);
            setIsAnimating(false);

            Animated.parallel([
                Animated.timing(overlayOpacity, {
                    toValue: 1,
                    ...ANIMATION_CONFIG.OPEN.overlay,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: SCREEN_WIDTH - (SCREEN_WIDTH * DRAWER_WIDTH_RATIO),
                    ...ANIMATION_CONFIG.OPEN.drawer,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, slideAnim, overlayOpacity]);

    if (!visible) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={handleCloseAnimation}
            statusBarTranslucent
        >
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.overlay,
                        {
                            opacity: overlayOpacity,
                        },
                    ]}
                >
                    <Pressable style={styles.overlayPressable} onPress={handleCloseAnimation} />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.drawerContainer,
                        {
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    <Pressable style={styles.drawerContent} onPress={() => { }}>
                        <SafeAreaView style={styles.drawerInner}>
                            <View style={styles.drawerHeader}>
                                <Text style={styles.drawerTitle}>{title}</Text>
                                <TouchableOpacity
                                    onPress={handleCloseAnimation}
                                    style={styles.closeButton}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="close" size={24} color={COLORS.textSecondary} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.contentContainer}>
                                {children}
                            </View>
                        </SafeAreaView>
                    </Pressable>
                </Animated.View>
            </View>
        </Modal>
    );
}

const DRAWER_STYLES = {
    width: SCREEN_WIDTH * DRAWER_WIDTH_RATIO,
    maxWidth: Platform.OS === 'web' ? 500 : undefined,
    minWidth: Platform.OS === 'web' ? 400 : undefined,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayPressable: {
        flex: 1,
    },
    drawerContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        ...DRAWER_STYLES,
        backgroundColor: COLORS.white,
        ...SHADOWS.large,
    },
    drawerContent: {
        flex: 1,
    },
    drawerInner: {
        flex: 1,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.neutral,
        backgroundColor: COLORS.surface,
    },
    drawerTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: FONT_WEIGHTS.bold,
        color: COLORS.primary,
        flex: 1,
    },
    closeButton: {
        padding: SPACING.xs,
        borderRadius: 20,
        backgroundColor: COLORS.gray100,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
});